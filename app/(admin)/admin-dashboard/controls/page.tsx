import Header from "@/components/admin-dashboard/header";
import DataNetworkStatus from '@/components/admin-dashboard/controls/data-network-status';
import ReportedIssues from "@/components/admin-dashboard/controls/reported-issues";
import TransactionSearch from "@/components/admin-dashboard/controls/transaction-checker";
import PendingTransactions from '@/components/admin-dashboard/controls/pending-transaction-control';

export default function Controls() {
    return (
        <>
            <Header />
            <DataNetworkStatus />
            <ReportedIssues />
            <TransactionSearch />
            <PendingTransactions />
        </>
    )
}