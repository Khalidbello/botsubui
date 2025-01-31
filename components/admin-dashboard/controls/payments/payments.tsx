"use client";

import React, { useEffect, useRef, useState } from "react";
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
import PaymentSearch from "./search";
import LoadingAnimation from "@/components/admin-dashboard/loader2";

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
  const [filterable, setFilterable] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  }); // to hold date range for search
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentNumber, setPaymentNumber] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [emailfetch, setEmailFetch] = useState<boolean>(false); // to trigger useEffect on email search Bt click
  const [emailSearchBtActive, setemailSearchBtActive] = useState<boolean>(true); // to disable and enable email search bt approriately
  const searchbtRef = useRef<HTMLButtonElement | null>(null);
  let pageNum = 1;

  // function to update fiterable
  const updateFilterable = (filterable: boolean) => {
    setFilterable(filterable);
    //pageNum = 1;
  };

  // function to handle show search
  const handleShowSearch = () => {
    if (searchbtRef.current) searchbtRef.current.style.opacity = "0.5";
    setTimeout(() => {
      if (searchbtRef.current) searchbtRef.current.style.opacity = "1";
    }, 220);
    setTimeout(() => setShowSearch(true), 240);
  };

  // function to fetch payment lists
  const fetchPaymentLists = async (pageNum: number) => {
    setShowError(false);
    setFetchingMore(true);

    try {
      const response = await fetch(
        `${url}/list-transactions/${dateRange.startDate}/${
          dateRange.endDate
        }/successful/${pageNum}/${searchEmail || null}`,
        {
          credentials: "include",
        }
      );

      if (response.status !== 200)
        throw "Feching transacction list not sucesfull";

      const data = await response.json();
      pageNum === 1
        ? setPayments(data.data.transactions)
        : setPayments([...payments, ...data.data.transactions]);
      setPaymentNumber(data.data.page_info.total);
      setemailSearchBtActive(true); // disable search email bt
      updateFilterable(false); // dsiable datefilter serach bt
    } catch (err) {
      setShowError(true);
    } finally {
      setShowLoader(false);
      setFetchingMore(false);
    }
  };

  // fucntion to initiate see more transfers
  const seeMoreTransfer = () => {
    pageNum++;
    setTimeout(() => fetchPaymentLists(pageNum), 300);
  };

  useEffect(() => {
    setPayments([]);
    setShowLoader(true);
    //fetchPaymentLists(pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, url, emailfetch]);

  return (
    <div className="h-full rounded-xl px-4 py-4 pb-24 max-w-[80rem] md:mx-auto">
      <div className="mx-auto max-w-[35rem] mb-4">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
          filterable={filterable}
          updateFilterable={updateFilterable}
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-x-2 my-3"
        >
          <input
            value={searchEmail}
            onChange={(e) => {
              e.stopPropagation();
              setSearchEmail(e.currentTarget.value);
              setemailSearchBtActive(false);
            }}
            type="text"
            placeholder="Email to search"
            className="px-4 py-3 bg-gray-100 rounded-full w-full"
          />
          <button
            className={`rounded-full px-6 py-2 text-white bg-blue-500 ${
              emailSearchBtActive && "bg-opacity-60"
            }`}
            onClick={() => {
              setEmailFetch(!emailfetch);
            }}
            disabled={emailSearchBtActive}
          >
            Search
          </button>
        </form>
      </div>

      {/* to be shown when fetching if date rane is changed */}
      {showLoader && (
        <div className="h-[80%] flex justify-center items-center">
          <LoadingAnimation h="h-[5rem]" />
        </div>
      )}

      {/* to be shown if an error occurs */}
      {showError && (
        <div className="flex flex-col justify-center gap-4 items-center h-[80%]">
          <p className="text-sm text-center text-red-500 mt-5">
            Sorry an error occured while fetching transfers
          </p>
        </div>
      )}

      {/* to be shown if payments is less than one */}
      {payments.length < 1 && !showLoader && !showError && (
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
      )}

      {/* to be shown if everything is alright */}
      {!showLoader && !showError && payments.length > 0 && (
        <>
          <div className="flex justify-center flex-shrink items-start flex-wrap gap-x-8 gap-y-6 mt-8">
            {payments.map((payment, index) => (
              <UnitTransfer key={index} payment={payment} url={url} />
            ))}
          </div>

          {/* see more bt */}
          {paymentNumber > payments.length && (
            <div className="mt-4 flex items-center justify-center">
              {fetchingMore ? (
                <LoadingAnimation h="h-[1.5rem]" />
              ) : (
                <button
                  onClick={seeMoreTransfer}
                  className="text-blue-400 text-sm"
                >
                  see more..
                </button>
              )}
            </div>
          )}

          {/* side bar */}
          <section className="flex flex-col items-center justify-center gap-y-6 fixed right-4 bottom-[6rem] rounded-full p-2 bg-blue-100 bg-opacity-50">
            <button
              ref={searchbtRef}
              onClick={handleShowSearch}
              className="pt-3"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="w-5 h-5 text-blue-600"
              />
            </button>
            <span className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
              {payments.length}
            </span>
            <span className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
              {paymentNumber}
            </span>
          </section>

          {showSearch && (
            <PaymentSearch payments={payments} show={setShowSearch} url={url} />
          )}
          <div className="h-[15rem] w-full"></div>
        </>
      )}
    </div>
  );
};

export type { transactionType };
export default Payments;
