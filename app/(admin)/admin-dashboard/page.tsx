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
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLoggedIn(true), 400);

        /*setTimeout(() => {
            //if (!loggedIn) router.push('/admin-login')
        }, 400);*/
    }, []);

    return (
        <>
            {loggedIn ? (
                <>
                    <Header />
                    <ToDaysEarning />
                    <Earnings />
                    <Transactions />
                    <Balances />
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}