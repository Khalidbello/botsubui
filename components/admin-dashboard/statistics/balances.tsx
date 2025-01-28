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
    dataWalletBalance: 0,
    transferableBalance: 0,
    ledgerBalance: 0,
    virtualAccountBalance: 0,
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

      setBalances({
        ...data,
      });
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
    <div className="mb-10 mt-16 m-6 rounded-lg border-[1px] border-blue-300 px-4 py-8 xl:max-w-[70rem] xl:mx-auto">
      <div className="font-semibold">Balances</div>
      <div className="flex justify-around flex-col screenRow:flex-row items-stretch flex-wrap  gap-6 mt-8">
        {!showErrorOccured && !dataFetched && <Loader2 h="h-[4rem]" />}

        {showErrorOccured && (
          <div className="text-center text-red-400">
            Sorry and error occurred <br /> Please try reloading page{" "}
          </div>
        )}

        {dataFetched && !showErrorOccured && (
          <>
            <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
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

            <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
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

            <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
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

            <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
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
          </>
        )}
      </div>
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
