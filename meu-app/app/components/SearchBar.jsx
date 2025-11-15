"use client";

import { useState } from "react";

export default function SearchBar({ onSearch, searchTerm }) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(localSearchTerm);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value);
        onSearch(value); // Busca em tempo real
    };

    const handleClear = () => {
        setLocalSearchTerm("");
        onSearch("");
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nome, cargo, tecnologia ou descrição..."
                        value={localSearchTerm}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-12 pr-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 placeholder-gray-500 dark:placeholder-gray-400"
                    />

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-600 dark:text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {localSearchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg
                                className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Exemplo:</span>
                    <button
                        type="button"
                        onClick={() => {
                            setLocalSearchTerm('React');
                            onSearch('React');
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        React
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setLocalSearchTerm('Product');
                            onSearch('Product');
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        Product
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setLocalSearchTerm('Design');
                            onSearch('Design');
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        Design
                    </button>
                </div>
            </form>
        </div>
    );
}