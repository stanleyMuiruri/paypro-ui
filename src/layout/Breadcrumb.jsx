import React from "react";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-2">
            <button
                onClick={goBack}
                className="flex items-center text-gray-600 hover:text-black transition-colors focus:outline-none"
            >
                {/* Left arrow icon */}
                <svg
                    className="w-5 h-5 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                {/* The text will be hidden on extra-small devices */}
                <span className="hidden sm:inline">Go Back</span>
            </button>
        </div>
    );
}
