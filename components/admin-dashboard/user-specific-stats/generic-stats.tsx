"use client";

import { useEffect, useState } from "react";
import {
  DateRangeType,
  FilterComponent,
  getCurrentDate,
} from "../statistics/transaction-stats/transactions-stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faNairaSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../loader2";
import { useRouter } from "next/navigation";

const UsersStatistics = () => {
  const router = useRouter();
  const [filterable, setFilterable] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  }); // to hold date range for search
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>({
    totalProfi: 0,
    numOfTransactions: 0,
    numOfUsersWithPurchase: 0,
    maxProfitPerUser5: [
      {
        _id: "2348188146243",
        maxProfit: -56.87999999999991,
      },
    ],
    minProfitPerUser5: [
      {
        _id: "24536258259321654",
        minProfit: -31.400000000000006,
      },
    ],
    maxNumOfTransactiosnPerUser5: [
      {
        _id: "2348188146243",
        transactionCount: 3,
      },
    ],
    minNumOfTransactiosnPerUser5: [
      {
        _id: "24536258259321654",
        transactionCount: 1,
      },
    ],
    averageProfitPerUser: 0,
    averageProfitPerTransaction: 0,
    averageTransactionPerUser: 0,
  });

  // function to update fiterable
  const updateFilterable = (filterable: boolean) => {
    setFilterable(filterable);
    //pageNum = 1;
  };

  // funtion to fetch data
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/robust-users-statistics/${dateRange.startDate}/${dateRange.endDate}`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) return router.push("/admin-login");
      if (response.status !== 200) throw "Something went wrong error";

      const data = await response.json();
      setData(data);
      setFilterable(false);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <div className="w-full h-full pb-20">
      <div className="w-full flex items-center justify-center mt-6">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
          filterable={filterable}
          updateFilterable={updateFilterable}
        />
      </div>
      <div className="flex justify-around flex-col screenRow:flex-row flex-wrap items-stretch gap-y-10 gap-6 mt-4 p-4">
        {isLoading && (
          <div className="w-full h-[30rem] flex items-center justify-center">
            <LoadingAnimation h="h-[5rem]" />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faUser}
                className="w-8 text-blue-400 mr-4"
              />
              <div>
                <div className="text-xl">{data.totalProfi.toFixed(2)}</div>
                <div className="text-gray-600">Total profit</div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faUser}
                className="w-8 text-blue-400 mr-4"
              />
              <div>
                <div className="text-xl">{data.numOfTransactions}</div>
                <div className="text-gray-600">
                  Total number of transactions
                </div>
              </div>
            </div>
            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faUser}
                className="w-8 text-blue-400 mr-4"
              />
              <div>
                <div className="text-xl">{data.numOfUsersWithPurchase}</div>
                <div className="text-gray-600">
                  Users that made transactions
                </div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faNairaSign}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.averageProfitPerUser.toFixed(2)}
                </div>
                <div className="text-gray-600">Average profit per user</div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faNairaSign}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.averageTransactionPerUser.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  Average transaction per user
                </div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faNairaSign}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.averageProfitPerTransaction.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  Average profit per transaction
                </div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faArrowAltCircleUp}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.maxProfitPerUser5.map((ele: any, index: number) => {
                    return (
                      <span key={index}>{ele.maxProfit.toFixed(2)}, </span>
                    );
                  })}
                </div>
                <div className="text-gray-600">Maximum profitper user</div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.minProfitPerUser5.map((ele: any, index: number) => {
                    return (
                      <span key={index}>{ele.minProfit.toFixed(2)}, </span>
                    );
                  })}
                </div>
                <div className="text-gray-600">
                  Minimum transaction per user
                </div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faArrowAltCircleUp}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.maxNumOfTransactiosnPerUser5.map(
                    (ele: any, index: number) => {
                      return (
                        <span key={index}>
                          {ele.transactionCount.toFixed(2)},{" "}
                        </span>
                      );
                    }
                  )}
                </div>
                <div className="text-gray-600">
                  Maximum transaction per user
                </div>
              </div>
            </div>

            <div className="hover:shadow-blue-200  flex items-center bg-white shadow-md rounded-lg p-4">
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                className="w-8 text-blue-500 mr-4"
              />
              <div>
                <div className="text-xl">
                  {data.minNumOfTransactiosnPerUser5.map(
                    (ele: any, index: number) => {
                      return (
                        <span key={index}>
                          {ele.transactionCount.toFixed(2)},{" "}
                        </span>
                      );
                    }
                  )}
                </div>
                <div className="text-gray-600">
                  Mininum transaction per user
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersStatistics;
