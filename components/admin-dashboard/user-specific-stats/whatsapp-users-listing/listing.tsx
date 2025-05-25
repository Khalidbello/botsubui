"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DateRangeType,
  FilterComponent,
  getCurrentDate,
} from "@/components/admin-dashboard/statistics/transaction-stats/transactions-stats";
import { useRouter } from "next/navigation";
import Loader2 from "@/components/admin-dashboard/loader2";
import dateFormatter from "@/app/utils/date-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface WhatsAppUser {
  id: number;
  phoneNumber: string;
  name: string;
  lastMessage: Date;
  lastTransaction?: Date;
  transactionCount?: number;
  firstPurchase?: boolean;
  createdAt: Date;
}

const LIMIT = 10;

const WhatsappUsersListing = () => {
  const router = useRouter();
  const [users, setUsers] = useState<WhatsAppUser[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterable, setFilterable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<
    "lastMessage" | "lastTransact" | "createdAt"
  >("lastMessage");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchUsers = useCallback(
    async (reset = false) => {
      const currentOffset = reset ? 0 : offset;
      setError(null);

      try {
        reset ? setLoading(true) : setLoadingMore(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/list-whatsapp-users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              dateRange: {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
              },
              pagination: {
                limit: LIMIT,
                offset: currentOffset,
              },
              sortBy,
              sortOrder,
            }),
          }
        );

        if (response.status === 401) {
          router.push("/admin-login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data, pagination } = await response.json();

        setHasMore(pagination.hasMore);
        setTotal(pagination.total);

        if (reset) {
          setUsers(data);
          setOffset(LIMIT);
        } else {
          setUsers((prev) => [...prev, ...data]);
          setOffset((prev) => prev + LIMIT);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
        if (reset) setUsers([]);
      } finally {
        reset ? setLoading(false) : setLoadingMore(false);
      }
    },
    [dateRange, offset, router, sortBy, sortOrder]
  );

  useEffect(() => {
    fetchUsers(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, sortBy, sortOrder]);

  const handleMessageClick = (phoneNumber: number) => {
    window.open(
      `https://wa.me/${phoneNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleViewAccount = (userId: number) => {
    window.open(`https://wa.me/${userId}`, "_blank", "noopener,noreferrer");
  };

  const handleSortChange = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-around items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange("lastMessage")}
                className={`px-3 py-1 text-sm rounded ${
                  sortBy === "lastMessage"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100"
                }`}
              >
                Last Message{" "}
                {sortBy === "lastMessage" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("lastTransact")}
                className={`px-3 py-1 text-sm rounded ${
                  sortBy === "lastTransact"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100"
                }`}
              >
                Last Transaction{" "}
                {sortBy === "lastTransact" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("createdAt")}
                className={`px-3 py-1 text-sm rounded ${
                  sortBy === "createdAt"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100"
                }`}
              >
                Signup Date{" "}
                {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
            <div className="w-full md:w-auto">
              <FilterComponent
                setDateRange={setDateRange}
                getCurrentDate={getCurrentDate}
                filterable={filterable}
                updateFilterable={setFilterable}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 h="h-12" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        ) : users.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-600 p-4 rounded-lg">
            No users found for the selected date range
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onMessage={() => handleMessageClick(user.id)}
                  onViewAccount={() => handleViewAccount(user.id)}
                />
              ))}
            </div>

            {/* side bar */}
            <section className="flex flex-col items-center justify-center gap-y-6 fixed right-4 bottom-[6rem] rounded-full p-2 bg-blue-100 bg-opacity-50">
              <span className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                {users.length}
              </span>
              <span className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                {total}
              </span>
            </section>

            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => fetchUsers(false)}
                  disabled={loadingMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <Loader2 h="h-4" />
                    </span>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface UserCardProps {
  user: WhatsAppUser;
  onMessage: () => void;
  onViewAccount: () => void;
}

const UserCard = ({ user, onMessage, onViewAccount }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium text-gray-800">
              {user.name || `User ${user.id}`}
            </h3>
            <p className="text-gray-500 text-sm">
              {user.id || "No phone number"}
            </p>
          </div>
          <button
            onClick={onMessage}
            className="text-green-500 hover:text-green-600 transition-colors p-2"
            aria-label="Message on WhatsApp"
            title="Message on WhatsApp"
            disabled={!user.id}
          >
            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex justify-between">
            <span>Last Active:</span>
            <span className="font-medium">
              {dateFormatter(user.lastMessage)}
            </span>
          </div>

          {user.lastTransaction && (
            <div className="flex justify-between">
              <span>Last Transaction:</span>
              <span className="font-medium">
                {dateFormatter(user.lastTransaction)}
              </span>
            </div>
          )}

          {user.transactionCount !== undefined && (
            <div className="flex justify-between">
              <span>Transactions:</span>
              <span className="font-medium">{user.transactionCount}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Member Since:</span>
            <span className="font-medium">{dateFormatter(user.createdAt)}</span>
          </div>

          {user.firstPurchase && (
            <div className="flex justify-between">
              <span>First Purchase:</span>
              <span className="font-medium">Yes</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onViewAccount}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappUsersListing;
