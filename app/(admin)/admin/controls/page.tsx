"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/admin-dashboard/header";
import DataNetworkStatus from "@/components/admin-dashboard/controls/data-network-status";
import ReportedIssues from "@/components/admin-dashboard/controls/reported-issues/reported-issues";
import TransactionSearch from "@/components/admin-dashboard/controls/transaction-checker";
import PendingTransactions from "@/components/admin-dashboard/controls/pending-transactions/pending-transaction-control";

export default function Controls() {
  const router = useRouter();
  const url: string | undefined = process.env.NEXT_PUBLIC_URL;

  return (
    <>
      <Header />
      <div className="px-1 md:px-6">
        <DataNetworkStatus url={url} router={router} />
        <TransactionSearch url={url} router={router} />
        <ReportedIssues url={url} router={router} />
        <PendingTransactions url={url} router={router} />
      </div>
    </>
  );
}
