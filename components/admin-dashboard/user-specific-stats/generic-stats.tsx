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

interface UserStat {
  _id: string;
  maxProfit?: number;
  minProfit?: number;
  transactionCount?: number;
}

interface StatsData {
  totalProfi: number;
  numOfTransactions: number;
  numOfUsersWithPurchase: number;
  maxProfitPerUser5: UserStat[];
  minProfitPerUser5: UserStat[];
  maxNumOfTransactiosnPerUser5: UserStat[];
  minNumOfTransactiosnPerUser5: UserStat[];
  averageProfitPerUser: number;
  averageProfitPerTransaction: number;
  averageTransactionPerUser: number;
}

const UsersStatistics = () => {
  const router = useRouter();
  const [filterable, setFilterable] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<StatsData>({
    totalProfi: 0,
    numOfTransactions: 0,
    numOfUsersWithPurchase: 0,
    maxProfitPerUser5: [],
    minProfitPerUser5: [],
    maxNumOfTransactiosnPerUser5: [],
    minNumOfTransactiosnPerUser5: [],
    averageProfitPerUser: 0,
    averageProfitPerTransaction: 0,
    averageTransactionPerUser: 0,
  });

  const updateFilterable = (filterable: boolean) => {
    setFilterable(filterable);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/robust-users-statistics/${dateRange.startDate}/${dateRange.endDate}`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) {
        router.push("/admin-login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const formatUserId = (id: string) => id.slice(-4);

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-full flex items-center justify-center mb-6">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
          filterable={filterable}
          updateFilterable={updateFilterable}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          Error: {error}
        </div>
      )}

      {isLoading ? (
        <div className="w-full h-[30rem] flex items-center justify-center">
          <LoadingAnimation h="h-[5rem]" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon={faUser}
              value={data.numOfUsersWithPurchase}
              label="Active Users"
              isCount={true}
            />
            <StatCard
              icon={faNairaSign}
              value={data.totalProfi}
              label="Total Profit"
              isCurrency={true}
            />
            <StatCard
              icon={faUser}
              value={data.numOfTransactions}
              label="Total Transactions"
              isCount={true}
            />
          </div>

          {/* Averages Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={faNairaSign}
              value={data.averageProfitPerUser}
              label="Avg Profit/User"
              isCurrency={true}
            />
            <StatCard
              icon={faNairaSign}
              value={data.averageTransactionPerUser}
              label="Avg Transactions/User"
              isDecimal={true}
            />
            <StatCard
              icon={faNairaSign}
              value={data.averageProfitPerTransaction}
              label="Avg Profit/Transaction"
              isCurrency={true}
            />
          </div>

          {/* Profit Extremes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExtremeStatsCard
              icon={faArrowAltCircleUp}
              data={data.maxProfitPerUser5}
              label="Top Profitable Users"
              valueKey="maxProfit"
              isCurrency={true}
            />
            <ExtremeStatsCard
              icon={faArrowAltCircleDown}
              data={data.minProfitPerUser5}
              label="Least Profitable Users"
              valueKey="minProfit"
              isCurrency={true}
            />
          </div>

          {/* Transaction Extremes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExtremeStatsCard
              icon={faArrowAltCircleUp}
              data={data.maxNumOfTransactiosnPerUser5}
              label="Most Active Users"
              valueKey="transactionCount"
              isCount={true}
            />
            <ExtremeStatsCard
              icon={faArrowAltCircleDown}
              data={data.minNumOfTransactiosnPerUser5}
              label="Least Active Users"
              valueKey="transactionCount"
              isCount={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for stat cards
const StatCard = ({
  icon,
  value,
  label,
  isCurrency = false,
  isCount = false,
  isDecimal = false,
}: {
  icon: any;
  value: number;
  label: string;
  isCurrency?: boolean;
  isCount?: boolean;
  isDecimal?: boolean;
}) => {
  const formattedValue = isCurrency
    ? value.toFixed(2)
    : isCount
    ? value.toString()
    : isDecimal
    ? value.toFixed(2)
    : value;

  return (
    <div className="hover:shadow-blue-200 flex items-center bg-white shadow-md rounded-lg p-4">
      <FontAwesomeIcon icon={icon} className="w-8 text-blue-500 mr-4" />
      <div>
        <div className="text-xl">{formattedValue}</div>
        <div className="text-gray-600">{label}</div>
      </div>
    </div>
  );
};

// Helper component for extreme stats
const ExtremeStatsCard = ({
  icon,
  data,
  label,
  valueKey,
  isCurrency = false,
  isCount = false,
}: {
  icon: any;
  data: UserStat[];
  label: string;
  valueKey: keyof UserStat;
  isCurrency?: boolean;
  isCount?: boolean;
}) => {
  return (
    <div className="hover:shadow-blue-200 flex items-start bg-white shadow-md rounded-lg p-4">
      <FontAwesomeIcon icon={icon} className="w-8 text-blue-500 mr-4 mt-1" />
      <div>
        <div className="space-y-2">
          {data.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>User {item._id}:</span>
              <span>
                {isCurrency
                  ? (item[valueKey] as number)?.toFixed(2)
                  : isCount
                  ? item[valueKey]?.toString()
                  : item[valueKey]}
              </span>
            </div>
          ))}
        </div>
        <div className="text-gray-600 mt-2">{label}</div>
      </div>
    </div>
  );
};

export default UsersStatistics;
