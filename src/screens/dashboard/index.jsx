import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { parseStringPromise } from 'xml2js';

const validData = [
    { accountToken: 'ACC1234567890', bankCode: 'KEN001', amount: 5000, reference: 'REF001', status: 'Processed', error: '' },
    { accountToken: 'ACC0987654321', bankCode: 'KEN002', amount: 12000, reference: 'REF002', status: 'Processed', error: '' },
    { accountToken: 'ACC3333333333', bankCode: 'KEN003', amount: 8000, reference: 'REF004', status: 'Processed', error: '' },
    { accountToken: 'ACC4444444444', bankCode: 'KEN001', amount: 2500, reference: 'REF005', status: 'Processed', error: '' },
    { accountToken: 'ACC5555555555', bankCode: 'KEN004', amount: 10000, reference: 'REF006', status: 'Processed', error: '' },
    { accountToken: 'ACC6666666666', bankCode: 'KEN005', amount: 15000, reference: 'REF007', status: 'Processed', error: '' },
];

const invalidData = [
    { accountToken: '', bankCode: 'KEN003', amount: 7000, reference: 'REF003', status: 'Failed', error: 'Missing accountToken' },
    { accountToken: 'ACC7777777777', bankCode: '', amount: null, reference: '', status: 'Rejected', error: 'Invalid bankCode and missing reference' },
    { accountToken: 'ACC8888888888', bankCode: 'KEN999', amount: -200, reference: 'REF008', status: 'Failed', error: 'Negative amount' },
    { accountToken: 'ACC9999999999', bankCode: 'KEN001', amount: 0, reference: 'REF009', status: 'Failed', error: 'Zero amount' },
];

const Dashboard = () => {
    const [tab, setTab] = useState('valid');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const itemsPerPage = 5;

    const data = tab === 'valid' ? validData : invalidData;
    const headers = ['accountToken', 'bankCode', 'amount', 'reference', 'status', 'error'];
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const totalAccounts = validData.length + invalidData.length;
    const validAccounts = validData.length;
    const invalidAccounts = invalidData.length;
    const totalValidAmount = validData.reduce((sum, acc) => sum + (acc.amount || 0), 0);
    const totalInvalidAmount = invalidData.reduce((sum, acc) => sum + (acc.amount || 0), 0);
    const uniqueBankCodes = new Set([
        ...validData.map((d) => d.bankCode),
        ...invalidData.map((d) => d.bankCode)
    ].filter(Boolean)).size;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setShowModal(true);
        }
    };

    const handleFileImport = async () => {
        if (!selectedFile) return;

        setShowModal(false);
        setLoading(true);

        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const content = e.target.result;

                if (selectedFile.name.endsWith('.json')) {
                    const parsed = JSON.parse(content);
                    console.log('Parsed JSON:', parsed);
                } else if (selectedFile.name.endsWith('.xlsx')) {
                    const workbook = XLSX.read(content, { type: 'binary' });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const parsed = XLSX.utils.sheet_to_json(sheet);
                    console.log('Parsed Excel:', parsed);
                } else if (selectedFile.name.endsWith('.xml')) {
                    const parsed = await parseStringPromise(content);
                    console.log('Parsed XML:', parsed);
                }
            } catch (err) {
                console.error('File parsing error:', err);
            } finally {
                setLoading(false);
                setSelectedFile(null);
            }
        };

        if (selectedFile.name.endsWith('.xlsx')) {
            reader.readAsBinaryString(selectedFile);
        } else {
            reader.readAsText(selectedFile);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-20 relative">
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Import</h2>
                        <p className="text-sm text-gray-600 mb-6">You're about to import: <strong>{selectedFile?.name}</strong></p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFileImport}
                                className="px-4 py-2 text-sm rounded text-white"
                                style={{ backgroundColor: 'var(--color-pesalink-teal)' }}
                            >
                                Confirm Import
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6 text-center">
                <StatBox title="Total Accounts" value={totalAccounts} bgColor="var(--color-pesalink-blue)" />
                <StatBox title="Valid Accounts" value={validAccounts} bgColor="var(--color-pesalink-teal)" />
                <StatBox title="Invalid Accounts" value={invalidAccounts} bgColor="var(--color-pesalink-orange)" />
                <StatBox title="Valid Amount" value={`KES ${totalValidAmount.toLocaleString()}`} bgColor="var(--color-pesalink-teal-hover)" />
                <StatBox title="Invalid Amount" value={`KES ${totalInvalidAmount.toLocaleString()}`} bgColor="var(--color-pesalink-dark)" />
                <StatBox title="Bank Codes" value={uniqueBankCodes} bgColor="var(--color-pesalink-blue)" />
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
                {['valid', 'invalid'].map(type => (
                    <button
                        key={type}
                        onClick={() => { setTab(type); setCurrentPage(1); }}
                        className={`px-6 py-2 font-semibold text-sm uppercase border-b-4 transition-all duration-200 ${tab === type
                                ? type === 'valid'
                                    ? 'text-[var(--color-pesalink-teal)] border-[var(--color-pesalink-teal)]'
                                    : 'text-[var(--color-pesalink-orange)] border-[var(--color-pesalink-orange)]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Export & Import */}
            <div className="flex justify-between mb-4">
                <div>
                    <label
                        className="text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md cursor-pointer"
                        style={{ backgroundColor: 'var(--color-pesalink-orange)' }}
                    >
                        Import File
                        <input type="file" accept=".json,.xml,.xlsx" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>
                <div className="flex gap-2">
                    {['CSV', 'Excel', 'XML'].map(type => (
                        <button
                            key={type}
                            className="text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition hover:shadow-lg"
                            style={{ backgroundColor: 'var(--color-pesalink-teal)' }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loader */}
            {loading && <p className="text-center text-sm text-gray-500 mb-4">Processing file...</p>}

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {headers.map((h, idx) => (
                                <th key={idx} className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {paginatedData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[var(--color-pesalink-blue)]/5 transition duration-150">
                                {headers.map((h, i) => (
                                    <td key={i} className="px-6 py-4 text-gray-700 whitespace-nowrap">{row[h] || '-'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const StatBox = ({ title, value, bgColor }) => (
    <div className="p-4 rounded-lg shadow-md text-white" style={{ backgroundColor: bgColor }}>
        <p className="text-xs">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);

export default Dashboard;
