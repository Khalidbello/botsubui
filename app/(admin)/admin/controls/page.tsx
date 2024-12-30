"use client";

import { useRouter } from "next/navigation";
import DataNetworkStatus from "@/components/admin-dashboard/controls/data-network-status";
import ReportedIssues from "@/components/admin-dashboard/controls/reported-issues/reported-issues";
import PendingTransactions from "@/components/admin-dashboard/controls/pending-transactions/pending-transaction-control";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
  faClock,
  faNoteSticky,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

export default function Controls() {
  const router = useRouter();
  const url: string | undefined = process.env.NEXT_PUBLIC_URL;
  const [inView, setInView] = useState<string>("networkStatus");
  const networkStatusBtRef = useRef<HTMLButtonElement | null>(null);
  const reportedIssuesBtRef = useRef<HTMLButtonElement | null>(null);
  const pendingTransactionsBtRef = useRef<HTMLButtonElement | null>(null);

  // fucntion to handle change of view
  const changeView = (e: React.MouseEvent<HTMLButtonElement>, info: string) => {
    if (info === "networkStatus" && networkStatusBtRef?.current)
      networkStatusBtRef.current.style.opacity = "0.6";
    if (info === "reportedIssues" && reportedIssuesBtRef?.current)
      reportedIssuesBtRef.current.style.opacity = "0.6";
    if (info === "pendingTransactions" && pendingTransactionsBtRef?.current)
      pendingTransactionsBtRef.current.style.opacity = "0.6";

    setTimeout(() => {
      if (info === "networkStatus" && networkStatusBtRef?.current)
        networkStatusBtRef.current.style.opacity = "1";
      if (info === "reportedIssues" && reportedIssuesBtRef?.current)
        reportedIssuesBtRef.current.style.opacity = "1";
      if (info === "pendingTransactions" && pendingTransactionsBtRef?.current)
        pendingTransactionsBtRef.current.style.opacity = "1";
    }, 250);

    setTimeout(() => setInView(info), 260);
  };

  return (
    <>
      <div className="w-full h-full pb-20">
        <header className="w-full flex items-center justify-center gap-4 p-4">
          <button
            ref={networkStatusBtRef}
            onClick={(e) => changeView(e, "networkStatus")}
            className={`flex items-center justify-center gap-2 h-full ${
              inView === "networkStatus" && "border-b-2 border-b-blue-300"
            }`}
          >
            Network
            <FontAwesomeIcon icon={faWifi} className="w-3 h-3 text-blue-600" />
          </button>
          <span className="w-[2px] h-[2rem] bg-gray-300"></span>
          <button
            ref={reportedIssuesBtRef}
            onClick={(e) => changeView(e, "reportedIssues")}
            className={`flex items-center justify-center gap-2 h-full ${
              inView === "reportedIssues" && "border-b-2 border-b-blue-300"
            }`}
          >
            Issues
            <FontAwesomeIcon
              icon={faNoteSticky}
              className="w-3 h-3 text-blue-600"
            />
          </button>
          <span className="w-[2px] h-[2rem] bg-gray-300"></span>
          <button
            ref={pendingTransactionsBtRef}
            onClick={(e) => changeView(e, "pendingTransactions")}
            className={`flex items-center justify-center gap-2 h-full ${
              inView === "pendingTransactions" && "border-b-2 border-b-blue-300"
            }`}
          >
            Pending
            <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-blue-600" />
          </button>
        </header>

        {inView === "networkStatus" && (
          <DataNetworkStatus url={url} router={router} />
        )}
        {/* {inView === "reportedIssues" && (
        <TransactionSearch url={url} router={router} />
      )} */}
        {inView === "reportedIssues" && (
          <ReportedIssues url={url} router={router} />
        )}
        {inView === "pendingTransactions" && (
          <PendingTransactions url={url} router={router} />
        )}
      </div>
      <div className="h-24"></div>
    </>
  );
}
