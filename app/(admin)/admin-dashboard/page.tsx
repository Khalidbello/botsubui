'use client';

import Header from '@/components/admin-dashboard/header';
import Transactions from '@/components/admin-dashboard/statistics/transaction-stats/transactions-stats';
import Earnings from '@/components/admin-dashboard/statistics/earnings';
import ToDaysEarning from '@/components/admin-dashboard/statistics/todays-earning';
import Loader from '@/components/admin-dashboard/loader';
import Balances from '@/components/admin-dashboard/statistics/balances';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const url: string | undefined = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PROD_URL;
    console.log('ur;lllllllllllllllllll................', url, process.env.NEXT_PUBLIC_NODE_ENV, process.env.NEXT_PUBLIC_DEV_URL);
 
    return (
        <>

            <Header />
            <ToDaysEarning url={url} router={router} />
            <Earnings url={url} router={router} />
            <Transactions url={url} router={router} />
            <Balances url={url} router={router} />
        </>
    )
}