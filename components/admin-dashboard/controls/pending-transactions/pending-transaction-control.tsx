"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";
import SlidingButton from "./auto-retry-controller";
import UnitPending from "./unit-pending-trans";
import Loader from "../../loader";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface transactionType {
  id: string;
  email: string;
  txRef: string;
  status: Boolean;
  product: string;
  beneficiary: string;
  date: string;
  senderId: string;
  info: string;
}

const PendingTransactions: React.FC<{
  url: string | undefined;
  router: AppRouterInstance;
}> = ({ url, router }) => {
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [showMoreLoader, setShowMoreLoader] = useState<boolean>(true);
  const [pagging, setpagging] = useState<number>(0);

  useEffect(() => {
    setShowMoreLoader(true);

    //fetch pending transactions
    fetch(`${url}/pending-transaction/${pagging}/4`, { credentials: "include" })
      .then((response) => {
        if (response.status === 200) {
          console.log("pending response...........", response);
          return response.json();
        } else {
          throw "somrthing went wrog fetching pending transactions";
        }
      })
      .then((datas) => {
        const newData = [...transactions, ...datas];
        setTransactions(newData);
        setShowLoader(false);
        setShowMoreLoader(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error in fetching pending...........:", error);
        setShowError(true);
        setShowMoreLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagging, url]);

  return (
    <div className="mt-10 mb-14 h-auto rounded-xl px-6 py-4 border-[1px] border-blue-100 max-w-[70rem] mx-4 md:mx-auto">
      <h2 className="font-semibold">Pending Transactions</h2>
      <div className="flex items-center justify-between mt-4 mb-6 px-8 py-4 md:justify-center max-w-[20em] mx-auto md:gap-x-5 shadow-md rounded-full">
        <span>Auto Retry</span> <SlidingButton url={url} />
      </div>
      {showError ? (
        <div className="text-sm text-center text-red-500 mt-5">
          Sorry an error occured while fetching pending transactions.
        </div>
      ) : (
        <>
          <div className="flex justify-center items-start flex-wrap gap-x-8 gap-y-6 mt-8">
            {showLoader ? (
              <Loader2 h="h-[5rem]" />
            ) : (
              transactions.map((transaction, index) => (
                <UnitPending key={index} transaction={transaction} url={url} />
              ))
            )}
          </div>
          {showMoreLoader ? (
            <Loader2 h="h-[1rem]" />
          ) : (
            <div className="text-center text-blue-400 mt-3">
              {" "}
              <button onClick={() => setpagging(pagging + 1)}>
                see more..
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export type { transactionType };
export default PendingTransactions;
