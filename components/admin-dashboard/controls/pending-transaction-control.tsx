'use client';

import React, { useEffect, useRef, useState } from 'react';
import Loader2 from '@/components/admin-dashboard/loader2';

const PendingTransactions: React.FC = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, ref: 'REF001', product: 'Product A', amount: 100, date: '2024-04-09' },
        { id: 2, ref: 'REF002', product: 'Product B', amount: 200, date: '2024-04-10' },
        { id: 3, ref: 'REF003', product: 'Product C', amount: 150, date: '2024-04-11' },
        // Add more transactions as needed
    ]);
    const [showLoader, setShowLoader] = useState<boolean>(true);

    const handleRetry = (id: number) => {
        // Retry logic
        console.log(`Retrying transaction with ID ${id}`);
    };

    const handleSettle = (id: number) => {
        // Settle logic
        console.log(`Settling transaction with ID ${id}`);
    };

    const handleCancel = (id: number) => {
        // Cancel logic
        console.log(`Canceling transaction with ID ${id}`);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false)
        }, 500);
    })
    return (
        <div className="container mx-auto px-4 py-8 mt-8">
            <h2 className="text-xl font-semibold">Pending Transactions</h2>
            <div className='flex items-center justify-between mt-4 mb-6 px-8 py-4 md:justify-center max-w-[20em] mx-auto md:gap-x-5 shadow-md rounded-full'>
                <span>Auto Retry</span>  <SlidingButton />
            </div>
            <div className="flex justify-center items-start flex-wrap gap-x-8 gap-y-6 mt-8">
                {showLoader ? (
                    <Loader2 h='h-[5rem]' />
                ) : (
                    transactions.map(transaction => (
                        <div key={transaction.id} className="bg-white rounded-lg shadow-md p-4 min-w-[20rem]">
                            <p><strong>ID:</strong> {transaction.id}</p>
                            <p><strong>Reference:</strong> {transaction.ref}</p>
                            <p><strong>Product:</strong> {transaction.product}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <div className="text-right space-x-4 mt-4">
                                <button
                                    className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full mr-2"
                                    onClick={() => handleRetry(transaction.id)}
                                >
                                    Retry
                                </button>
                                <button
                                    className="bg-green-50 text-green-600 px-6 py-2 rounded-full mr-2"
                                    onClick={() => handleSettle(transaction.id)}
                                >
                                    Settle
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};



const SlidingButton: React.FC = () => {
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState(true);

    const toggleChecked = () => {
        setShowLoader(true);
        console.log(isChecked)
        // make api request to save new auto retry failed
        setTimeout(() => setIsChecked(!isChecked), 500);
    };

    useEffect(() => {
        // fetch
        setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    }, [isChecked])

    return (
        <div onClick={toggleChecked} className="relative inline-block w-12 h-6">
            {showLoader ? (
                <Loader2 h='h-[0.8rem]' />
            ) : (
                <>
                    <div className={`w-full h-full rounded-full transition-colors duration-300 ${isChecked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute top-0 right-6 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md transition-transform duration-300 ${isChecked ? 'translate-x-full' : ''}`}></div>
                </>
            )}
        </div>
    );
};


export default PendingTransactions;
