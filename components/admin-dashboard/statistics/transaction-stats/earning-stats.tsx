import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Loader2 from "../../loader2";
import {
  Another,
  DateRangeType,
  FilterComponent,
  getCurrentDate,
  mockdataType,
} from "./transactions-stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faGlobe,
  faNairaSign,
  faQuestion,
  faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

export default function EarningsStats({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [showError, setShowError] = useState<boolean>(false);
  const [datas, setData] = useState({
    total: 0,
    succcessful: 0,
    pending: 0,
    profit: 0,
    average: 0,
  });
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [filterable, setFilterable] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });

  // function to update fiterable
  const updateFilterable = (filterable: boolean) => {
    setFilterable(filterable);
  };

  const fetchData = async () => {
    setDataFetched(false);
    setShowError(false);
    try {
      const response = await fetch(
        `${url}/statistics/${dateRange.startDate}/${dateRange.endDate}`,
        { credentials: "include" }
      );

      if (response.status === 401) return router.push("/admin-login");
      if (response.status !== 200) throw "An error occured fetchnig statistics";

      updateFilterable(false);
      const data = await response.json();
      setData(data);
      setDataFetched(true);
    } catch (err) {
      console.log("an error occurred while trying to fetch data", err);
      setDataFetched(true);
      setShowError(true);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <div className="max-w-[60rem] mb-14 mx-auto px-6 py-8 rounded-lg border border-blue-300">
      <div className="font-semibold mb-4 flex flex-col md:flex-row md:items-center justify-between flex-wrap">
        <span className="mb-2 md:mb-0">Transactions</span>
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
          filterable={filterable}
          updateFilterable={updateFilterable}
        />
      </div>

      {showError ? (
        <div className="text-red-500 text-sm text-center">
          An error occured... <br /> please try reloading page
        </div>
      ) : (
        <>
          {dataFetched ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="border flex flex-col justify-center items-center shadow-md rounded-lg p-6 bg-white hover:shadow-blue-200">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-xl text-purple-500 mr-4"
                />
                <div className="flex items-center gap-x-2">
                  <div className="text-lg font-semibold mb-1">
                    {datas.total}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Total transactions
                  </div>
                </div>
              </div>

              <div className="border flex flex-col justify-center items-center shadow-md rounded-lg p-6 bg-white hover:shadow-blue-200">
                <FontAwesomeIcon
                  icon={faQuestion}
                  className="text-xl text-red-500 mr-4"
                />
                <div className="flex items-center gap-x-2">
                  <div className="text-lg font-semibold mb-1">
                    {datas.pending}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Pending transactions
                  </div>
                </div>
              </div>

              <div className="border flex flex-col justify-center items-center shadow-md rounded-lg p-6 bg-white hover:shadow-blue-200">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-xl text-blue-500 mr-4"
                />
                <div className="flex items-center gap-x-2">
                  <div className="text-lg font-semibold mb-1">
                    {datas.succcessful}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Successful transactions
                  </div>
                </div>
              </div>

              <div className="border flex flex-col justify-center items-center shadow-md rounded-lg p-6 bg-white hover:shadow-blue-200">
                <FontAwesomeIcon
                  icon={faRecordVinyl}
                  className="text-xl text-cyan-600 mr-4"
                />
                <div className="flex items-center gap-x-2">
                  <div className="text-lg font-semibold mb-1">
                    {datas.average}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Average transaction per day
                  </div>
                </div>
              </div>

              <div className="border flex flex-col justify-center items-center shadow-md rounded-lg p-6 bg-white hover:shadow-blue-200 sm:col-span-2">
                <FontAwesomeIcon
                  icon={faNairaSign}
                  className="text-xl text-green-500 mr-4"
                />
                <div className="flex items-center gap-x-2">
                  <div className="text-lg font-semibold mb-1">
                    {datas.profit}
                  </div>
                  <div className="text-gray-600 text-sm">Profit</div>
                </div>
              </div>
            </div>
          ) : (
            <Loader2 h="h-[4rem]" />
          )}
        </>
      )}
    </div>
  );
}
