"use client";

import EarningsTrend from "@/components/admin-dashboard/statistics/earning-trend/earnings-trend
import ToDaysEarning from "@/components/admin-dashboard/statistics/todays-earning";
import Balances from "@/components/admin-dashboard/statistics/balances";
import { useRouter } from "next/navigation";
import EarningsStats from "@/components/admin-dashboard/statistics/transaction-stats/earning-stats";

export default function Page() {
  const router = useRouter();
  const url: string | undefined = process.env.NEXT_PUBLIC_URL;

  return (
    <div className="px-8 py-14 md:py-20">
      <ToDaysEarning url={url} router={router} />
      <EarningsTrend url={url} router={router} />
      <EarningsStats url={url} router={router} />
      <Balances url={url} router={router} />
    </div>
  );
}
