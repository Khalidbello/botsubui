'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React, { useState } from 'react';


const TransactionSearch = ({ url, router }: { url: string | undefined; router: AppRouterInstance }) => {
    const [transactionRef, setTransactionRef] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionRef(event.target.value);
    };

    const handleSearch = () => {
        // Simulate search result
        setSearchResult(`Search result for transaction "${transactionRef}"`);
    };

    return (
        <div className="mt-10 px-6 py-8 mx-4 bg-gray-100 rounded-xl">
            <h2 className="text-xl mb-6">Transaction Search</h2>
            <div className="flex items-center justify-center mb-6">
                <input
                    type="text"
                    className="flex-shrink min-w-[2rem] rounded-l-full flex-grow border border-gray-300 px-4 py-3 focus:outline-none focus:border-blue-500"
                    placeholder="Enter transaction reference number"
                    value={transactionRef}
                    onChange={handleInputChange}
                />
                <button
                    className="flex-shrink-0 bg-blue-500 text-white px-6 py-3 rounded-r-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {searchResult && (
                <div className="bg-white border border-gray-300 rounded-md shadow-md px-6 py-4 text-gray-800">
                    <p className="font-semibold">{searchResult}</p>
                </div>
            )}
        </div>
    );
};


export default TransactionSearch;
