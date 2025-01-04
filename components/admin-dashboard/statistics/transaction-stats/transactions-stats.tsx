"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";

// Function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(now.getDate()).padStart(2, "0"); // Add leading zero if needed
  return `${year}-${month}-${day}`;
};

// main componenet to export
interface mockdataType {
  title: string;
  value: number;
  type: string;
}

interface DateRangeType {
  startDate: string;
  endDate: string;
}

interface TransactionsFormerProps {
  title: string;
  value: number;
  router: AppRouterInstance;
  type: string;
}

const TransactionsFormer: React.FC<TransactionsFormerProps> = ({
  title,
  value,
  router,
  type,
}) => {
  return (
    <div className="hover:shadow-orange-400 flex items-center bg-white shadow-md rounded-lg p-4">
      <div className="text-3xl text-orange-500 mr-4">{"oo"}</div>
      <div>
        <div className="text-lg font-semibold">{value}</div>
        <div className="text-gray-600">{title}</div>
      </div>
    </div>
  );
};

const Another: React.FC<TransactionsFormerProps> = ({
  title,
  value,
  router,
  type,
}) => {
  return (
    <div className="hover:shadow-orange-400 flex flex-col bg-white shadow-md rounded-lg p-6">
      <div className="text-3xl text-orange-500 mb-4">{"icon"}</div>
      <div>
        <div className="text-lg font-semibold mb-1">{value}</div>
        <div className="text-gray-600 text-sm">{title}</div>
      </div>
    </div>
  );
};

// filter component

interface FilterComponentProp {
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeType>>;
  getCurrentDate: Function;
  filterable: boolean;
  updateFilterable: (filterable: boolean) => void;
}

const FilterComponent: React.FC<FilterComponentProp> = ({
  setDateRange,
  getCurrentDate,
  filterable,
  updateFilterable,
}) => {
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());

  const handleFilter = () => {
    // Perform validation if needed
    if (startDate && endDate) {
      // Send selected dates to the server
      setDateRange({
        startDate: startDate,
        endDate: endDate,
      });
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap md:flex-row md:items-center gap-x-4 gap-y-2">
      <input
        type="date"
        value={startDate}
        max={getCurrentDate()} // Set current date as the maximum date
        onChange={(e) => {
          updateFilterable(true);
          setStartDate(e.target.value);
        }}
        className="border border-gray-300 rounded-md px-3 py-2 text-xs"
      />
      <span className="text-xs">to</span>
      <input
        type="date"
        value={endDate}
        max={getCurrentDate()} // Set current date as the maximum date
        onChange={(e) => {
          updateFilterable(true);
          setEndDate(e.target.value);
        }}
        className="border border-gray-300 rounded-md px-3 py-2 text-xs"
      />
      <button
        onClick={handleFilter}
        className={`bg-blue-500 text-white px-4 py-1 rounded-full text-xs ${
          !filterable ? "opacity-40" : "opacity-100"
        }`}
        disabled={!filterable}
      >
        Filter
      </button>
    </div>
  );
};

export { TransactionsFormer, Another, FilterComponent, getCurrentDate };
export type { mockdataType, DateRangeType };
