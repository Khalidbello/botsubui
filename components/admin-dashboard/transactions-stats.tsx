'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React from "react";

export default function Earnings() {
    const router = useRouter();
    // use efffect to feth the datas

    return (
        <div className="mx-16 px-6 py-8 rounded-md shadow mt-10 md:max-w-[60rem] md:mx-auto">
            <div className='font-semibold text-lg'>Transactions</div>
            <div className="flex items-stretch justify-around mt-6 flex-wrap gap-8">
                {mockdata.map((ele, index) => <TransactionsFormer key={index} router={router} title={ele.title} value={ele.value} type={ele.type} />)}
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
        <div onClick={handleClick} className="hover:bg-orange-50 mouse-event-pointer min-h-20 bg-gray-50 rounded-lg flex flex-col justify-beween gap-4 px-5 py-6">
            <div><div className="w-[4rem] h-[4rem] rounded-full bg-orange-100"></div></div>
            <div className="font-bold text-2xl text-right pr-7">{value}</div>
            <div className="text-orange-400">{title}</div>
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


export { TransactionsFormer };
export type { mockdataType };
