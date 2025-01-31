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
import { error } from "console";

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
    <div className="max-w-[60rem] mb-14 mx-auto px-6 py-8 rounded-lg border border-blue-300">
      <h2 className="font-semibold text-lg mb-3">Todays Statistics</h2>
      {dataFetched && !showErrorOccured && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faGlobe}
              className="text-xl text-purple-500 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">{datas.total}</div>
              <div className="text-gray-600">Total transactions</div>
            </div>
          </div>

          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-xl text-orange-500 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">{datas.pending}</div>
              <div className="text-gray-600">Pending transactions</div>
            </div>
          </div>

          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-xl text-blue-500 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">{datas.succcessful}</div>
              <div className="text-gray-600">Succesfull transactions</div>
            </div>
          </div>

          <div className="col-span-1 border flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-blue-200">
            <FontAwesomeIcon
              icon={faNairaSign}
              className="text-xl text-green-600 mr-4"
            />
            <div>
              <div className="text-lg font-semibold">{datas.profit}</div>
              <div className="text-gray-600">Profits</div>
            </div>
          </div>
        </div>
      )}

      {!dataFetched && !showErrorOccured && <Loader2 h="h-[4rem]" />}

      {showErrorOccured && (
        <div className="text-center text-red-400">
          Sorry and error occurred <br /> Please try reloading page{" "}
        </div>
      )}
    </div>
  );
}
