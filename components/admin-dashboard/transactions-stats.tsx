'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React from "react";

export default function Earnings() {
    const router = useRouter();
    // use efffect to feth the datas

    return (
        <div className="mt-16 mx-6 rounded-lg shadow-md px-6 py-8 xl:max-w-[70rem] xl:mx-auto">
            <div className='font-semibold text-lg'>Transactions</div>
            <div className="flex items-stretch justify-around mt-6 flex-wrap gap-8">
                {mockdata.map((ele, index) => <Another key={index} router={router} title={ele.title} value={ele.value} type={ele.type} />)}
            </div>
        </div>
    )
};

interface TransactionsFormerProps {
    title: string;
    value: number;
    router: AppRouterInstance;
    type: string;
}


const TransactionsFormer: React.FC<TransactionsFormerProps> = ({ title, value, router, type }) => {

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.style.opacity = '0.4';
        router.push(`/admin/transactions/${type}`);
    }

    return (
        <div className="flex items-center bg-white shadow-md rounded-lg p-4">
            <div className="text-3xl text-orange-500 mr-4">{'oo'}</div>
            <div>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-gray-600">{title}</div>
            </div>
        </div>
    )
};



const Another: React.FC<TransactionsFormerProps> = ({ title, value, router, type }) => {

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.style.opacity = '0.4';
        router.push(`/admin/transactions/${type}`);
    }

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
      <div className="text-3xl text-orange-500 mb-4">{'icon'}</div>
      <div>
        <div className="text-lg font-semibold mb-1">{value}</div>
        <div className="text-gray-600 text-sm">{title}</div>
      </div>
    </div>
    )
};




interface mockdataType {
    title: string;
    value: number;
    type: string;
}

const mockdata: mockdataType[] = [
    {
        title: 'Total transactions',
        value: 2300,
        type: 'total',
    },
    {
        title: 'SUccesfull transactions',
        value: 2250,
        type: 'successful'
    },
    {
        title: 'Pending transactions',
        value: 50,
        type: 'pending-transactions'
    },
    {
        title: 'Refunded Transactions',
        value: 0,
        type: 'refunded',
    },
    {
        title: 'Pending Refund Transaction',
        value: 0,
        type: 'pending-refund'
    }
]


export { TransactionsFormer, Another };
export type { mockdataType };
