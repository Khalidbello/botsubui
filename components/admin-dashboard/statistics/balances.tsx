"use client";

import { useEffect, useState } from "react";
import { mockdataType } from "./transaction-stats/transactions-stats";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";

export default function Balances({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [balances, setBalances] = useState({
    dataWalletBalance: "6,050,000",
    transferableBalance: "5,900,000",
    ledgerBalance: "109,000",
    virtualAccountBalance: "3,000,000",
  });
  const [showErrorOccured, setShowErrorOccured] = useState<boolean>(false);

  // function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/balances`, {
        credentials: "include",
      });

      if (response.status === 401) return router.push("/admin-login");
      if (response.status !== 200) throw new Error("Something went wrong");

      const data = await response.json();

      // Handle potential null or empty `flutterWaveBalances` array

      // setBalances({
      //   ...data,
      // });
    } catch (error) {
      console.log("an error occurred........", error);
      setShowErrorOccured(true);
    } finally {
      setDataFetched(true);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className="max-w-[60rem] mx-auto px-6 py-8 rounded-lg border border-blue-300">
      <div className="font-semibold mb-4">Balances</div>
      {!showErrorOccured && !dataFetched && <Loader2 h="h-[4rem]" />}

      {showErrorOccured && (
        <div className="text-center text-red-400 py-6">
          Sorry and error occurred <br /> Please try reloading page{" "}
        </div>
      )}

      {dataFetched && !showErrorOccured && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faNairaSign}
              className="text-xl text-green-600 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">
                {balances.dataWalletBalance}
              </div>
              <div className="text-gray-600">Data wallet balance</div>
            </div>
          </div>

          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faNairaSign}
              className="text-xl text-green-600 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">
                {balances.transferableBalance}
              </div>
              <div className="text-gray-600">
                Transferable balance flutterwave
              </div>
            </div>
          </div>

          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faNairaSign}
              className="text-xl text-green-600 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">
                {balances.ledgerBalance}
              </div>
              <div className="text-gray-600">Ledger balance flutterwave</div>
            </div>
          </div>

          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faNairaSign}
              className="text-xl text-green-600 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">
                {balances.virtualAccountBalance}
              </div>
              <div className="text-gray-600">Virtual account balance</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mockdata: mockdataType[] = [
  {
    title: "Virtual account",
    value: 4000,
    type: "ifi",
  },
  {
    title: "Platform balance",
    value: 5000,
    type: "df",
  },
];
