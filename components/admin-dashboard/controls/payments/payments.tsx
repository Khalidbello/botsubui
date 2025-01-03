"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";
import UnitPending from "./unit-payment";
import Loader from "../../loader";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import UnitTransfer from "./unit-payment";
import {
  DateRangeType,
  FilterComponent,
  getCurrentDate,
} from "../../statistics/transaction-stats/transactions-stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface transactionType {
  id: string;
  email: string;
  txRef: string;
  status: Boolean;
  product: string;
  amount: number;
  beneficiary: string;
  date: string;
  senderId: string;
  info: string;
}

const Payments: React.FC<{
  url: string | undefined;
  router: AppRouterInstance;
}> = ({ url, router }) => {
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  }); // to hold date range for search
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentNumber, setPaymentNumber] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);

  // function to fetch payment lists
  const fetchPaymentLists = async () => {
    setShowLoader(true);
    setShowError(false);

    try {
      const response = await fetch(
        `${url}/list-transactions/${dateRange.startDate}/${dateRange.endDate}/successful`,
        {
          credentials: "include",
        }
      );

      if (response.status !== 200)
        throw "Feching transacction list not sucesfull";

      const data = await response.json();
      setPayments(data.data.transactions);
      setPaymentNumber(data.data.page_info.total);
    } catch (err) {
      setShowError(true);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    setShowLoader(true);
    fetchPaymentLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, url]);

  if (showLoader) {
    return (
      <div className="h-full w-full">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
        />
        <div className="flex flex-col justify-center gap-4 items-center h-[80%]">
          <Loader2 h="h-[5rem]" />
        </div>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="h-full w-full">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
        />
        <div className="flex flex-col justify-center gap-4 items-center h-[80%]">
          <div className="text-sm text-center text-red-500 mt-5">
            Sorry an error occured while fetching transfers
          </div>
        </div>
      </div>
    );
  }

  if (payments.length < 1) {
    return (
      <div className="h-full w-full">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
        />
        <div className="flex flex-col justify-center gap-4 items-center h-[80%]">
          <Image
            alt={"search image"}
            src={"/search-img.jpeg"}
            width={500}
            height={500}
            className="h-[7rem] object-contain"
          />
          <h2>No Payment Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto rounded-xl px-2 py-4 pb-24 max-w-[80rem] md:mx-auto">
      <div>
        {" "}
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
        />
      </div>

      <div className="flex justify-center flex-shrink items-start flex-wrap gap-x-8 gap-y-6 mt-8">
        {payments.map((payment, index) => (
          <UnitTransfer key={index} payment={payment} url={url} />
        ))}
      </div>

      <section className="flex flex-col items-center justify-center gap-y-6 fixed right-4 bottom-[6rem] rounded-full p-2 bg-blue-100 bg-opacity-50">
        <button className="pt-3">
          <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-blue-600" />
        </button>
        <span className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
          {paymentNumber}
        </span>
      </section>
    </div>
  );
};

export type { transactionType };
export default Payments;
