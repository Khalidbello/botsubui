"use client";

import { useRouter } from "next/navigation";
import {
  TransactionsFormer,
  mockdataType,
} from "@/components/admin-dashboard/statistics/transaction-stats/transactions-stats";
import { useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faGlobe,
  faNairaSign,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

export default function ToDaysEarning({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [datas, setDatas] = useState({
    total: 0,
    succcessful: 0,
    pending: 0,
    profit: 0,
  }); // Declare datas state variable
  const [showErrorOccured, setShowErrorOccured] = useState<boolean>(false);

  // function to fetch todays statistics
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/todays-statisitics`, {
        credentials: "include",
      });
      console.log("response in todays statistics, ", response);

      if (response.status === 401) return router.push("/admin-login");

      if (response.status !== 200)
        throw "something went wrong trying o fetch todays statistics";

      const data = await response.json();

      setDatas({ ...data }); // Set the datas state variable with fetched data
      setDataFetched(true);
    } catch (err) {
      setShowErrorOccured(true);
      setDataFetched(true);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-10 mx-6 rounded-lg border-[1px] border-blue-300 px-6 py-8 xl:max-w-[70rem] xl:mx-auto">
      <div className="font-semibold">Todays Earning</div>
      <div className="flex justify-around flex-col screenRow:flex-row flex-wrap items-stretch gap-6 mt-8">
        {dataFetched && !showErrorOccured && (
          <>
            <div className="hover:shadow-blue-200 flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-xl text-purple-500 mr-4"
              />
              <div>
                <div className="text-lg font-semibold">{datas.total}</div>
                <div className="text-gray-600">Total transactions</div>
              </div>
            </div>

            <div className="hover:shadow-blue-200 flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faQuestion}
                className="text-xl text-orange-500 mr-4"
              />
              <div>
                <div className="text-lg font-semibold">{datas.pending}</div>
                <div className="text-gray-600">Pending transactions</div>
              </div>
            </div>

            <div className="hover:shadow-blue-200 flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-xl text-blue-500 mr-4"
              />
              <div>
                <div className="text-lg font-semibold">{datas.succcessful}</div>
                <div className="text-gray-600">Succesfull transactions</div>
              </div>
            </div>

            <div className="hover:shadow-blue-200 flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faNairaSign}
                className="text-xl text-green-600 mr-4"
              />
              <div>
                <div className="text-lg font-semibold">{datas.profit}</div>
                <div className="text-gray-600">Profits</div>
              </div>
            </div>
          </>
        )}

        {!dataFetched && !showErrorOccured && <Loader2 h="h-[4rem]" />}

        {showErrorOccured && (
          <div className="text-center text-red-400">
            Sorry and error occurred <br /> Please try reloading page{" "}
          </div>
        )}
      </div>
    </div>
  );
}
