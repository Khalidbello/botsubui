"use client";

import { useEffect, useState } from "react";
import {
  DateRangeType,
  FilterComponent,
  getCurrentDate,
} from "../statistics/transaction-stats/transactions-stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../loader2";

const GenericStats = () => {
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: "1-11-2024",
    endDate: getCurrentDate(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // funtion to fetch data
  const fetchData = async () => {
    try {
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchData(), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingAnimation h="h-[5rem]" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-center mt-6">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
        />
      </div>
      <div className="flex justify-around flex-col screenRow:flex-row flex-wrap items-stretch gap-6 mt-4 p-4">
        <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="text-3xl text-orange-500 mr-4">{"oo"}</div>
          <div>
            <div className="text-lg font-semibold">{200}</div>
            <div className="text-gray-600">Total users</div>
          </div>
        </div>
        <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="text-3xl text-orange-500 mr-4">{"oo"}</div>
          <div>
            <div className="text-lg font-semibold">{""}</div>
            <div className="text-gray-600">Users with purchases</div>
          </div>
        </div>
        <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="text-3xl text-orange-500 mr-4">{"oo"}</div>
          <div>
            <div className="text-lg font-semibold">{""}</div>
            <div className="text-gray-600">Average purchase per user</div>
          </div>
        </div>
        <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="text-3xl text-orange-500 mr-4">{"oo"}</div>
          <div>
            <div className="text-lg font-semibold">{""}</div>
            <div className="text-gray-600">min purchase</div>
          </div>
        </div>
        <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="text-3xl text-orange-500 mr-4">{"oo"}</div>
          <div>
            <div className="text-lg font-semibold">{""}</div>
            <div className="text-gray-600">max purchase</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericStats;
