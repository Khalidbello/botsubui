'use client';

import Header from '@/components/admin-dashboard/header';
import Transactions from '@/components/admin-dashboard/transactions-stats';
import Earnings from '@/components/admin-dashboard/earnings';
import ToDaysEarning from '@/components/admin-dashboard/todays-earning';
import Loader from '@/components/admin-dashboard/loader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLoggedIn(true), 1000);

        setTimeout(() => {
            if (!loggedIn) router.push('/admin-login')
        }, 2000);
    });

    return (
        <>
            {loggedIn ? (
                <>
                    <Header />
                    <ToDaysEarning />
                    <Earnings />
                    <Transactions />
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}