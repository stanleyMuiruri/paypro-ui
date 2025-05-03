// Loader.jsx
import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--color-pesalink-teal)] border-b-4 border-[var(--color-pesalink-blue)]"></div>
        </div>
    );
};

export default Loader;
