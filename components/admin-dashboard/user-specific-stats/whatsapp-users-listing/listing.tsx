"use client";

import { useState, useEffect } from "react";

import {
  DateRangeType,
  FilterComponent,
  getCurrentDate,
} from "@/components/admin-dashboard/statistics/transaction-stats/transactions-stats";
import { useRouter } from "next/navigation";
import Loader2 from "@/components/admin-dashboard/loader2";
import dateFormatter from "@/app/utils/date-formatter";

// Mock data type
type DataItem = {
  id: string; // Phone number
  name: string;
  lastMessage: Date;
};

const WhatsappUsersListing = () => {
  const router = useRouter();
  const [data, setData] = useState<DataItem[]>([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterable, setFilterable] = useState(false);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  }); // to hold date range for search
  const [margin, setMargin] = useState(0); // Number of items per page

  // funtion to fetch data
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/list-whatsapp-users/${dateRange.startDate}/${dateRange.endDate}/10/${margin}`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) return router.push("/admin-login");
      if (response.status !== 200) throw "Something went wrong error";

      const newData = await response.json();
      setData([...data, ...newData]);
      setFilterable(false);
    } catch (err) {
      console.error("An error occrued fetching whatsapp user", err);
      setError("An error occured fetching whatsapp users.");
    } finally {
      setLoading(false);
      setReload(false);
    }
  };

  useEffect(() => {
    setMargin(0);
    setData([]);
    setReload(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  // function to update fiterable
  const updateFilterable = (filterable: boolean) => {
    setFilterable(filterable);
    //pageNum = 1;
  };

  // function to fetch more
  const fetchMore = () => {
    setMargin(margin + 10);
    fetchData();
  };

  const handleMessageClick = (phoneNumber: string) => {
    // Remove the first 3 characters and redirect to WhatsApp
    const formattedNumber = phoneNumber.slice(3);
    window.open(`https://wa.me/0${formattedNumber}`, "_blank");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full flex items-center justify-center mb-8">
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
          filterable={filterable}
          updateFilterable={updateFilterable}
        />
      </div>

      {reload && (
        <div className="flex items-center justify-center w-full h-[70%]">
          <Loader2 h="h-[5rem]" />
        </div>
      )}

      {!reload && (
        <>
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.id}</p>
                  <p className="text-gray-500">
                    Last message: {dateFormatter(item.lastMessage)}
                  </p>
                </div>
                <button
                  onClick={() => handleMessageClick(item.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Message
                </button>
              </div>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center m-2">
              <Loader2 h="h-[1rem]" />
            </div>
          )}

          {error && (
            <p className="flex items-center justify-center m-2 text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-center mt-4">
            <button onClick={fetchMore} className="px-6 py-2 text-blue-600">
              See More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WhatsappUsersListing;
