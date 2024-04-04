import Header from '@/components/admin-dashboard/header';
import Transactions from '@/components/admin-dashboard/transactions-stats';
import Earnings from '@/components/admin-dashboard/earnings';
import ToDaysEarning from '@/components/admin-dashboard/todays-earning';

export default function Page() {
    return (
        <>
            <Header />
            <Transactions />
            <Earnings />
            <ToDaysEarning />
        </>
    )
}