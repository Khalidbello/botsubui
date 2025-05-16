import Graph from "@/components/admin-dashboard/statistics/earning-trend/graph";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function EarningsTrend({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    dates: string[];
    counts: number[];
    profits: number[];
  }>({
    dates: [
      "2025-01-12",
      "2025-01-13",
      "2025-01-14",
      "2025-01-15",
      "2025-01-16",
      "2025-01-17",
      "2025-01-18",
      "2025-01-19",
      "2025-01-20",
      "2025-01-21",
      "2025-01-22",
      "2025-01-23",
      "2025-01-24",
      "2025-01-25",
      "2025-01-26",
      "2025-01-27",
      "2025-01-28",
      "2025-01-29",
      "2025-01-30",
      "2025-01-31",
    ],
    counts: [0, 0, 0, 2, 3, 5, 1, 2, 5, 3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    profits: [
      0, 0, -15, -12, -8, 0, 0, 0, 0, -15, -12, -8, -5, 2, 8, 12, 15, 18, 20,
      24,
    ],
  });
  const [showError, setShowError] = useState<boolean>(false);

  // fucntion to fethcData
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/trends/20`, {
        credentials: "include",
      });

      if (response.status === 401) return router.push("/admin-login");
      if (response.status !== 200) throw "something went wrong";

      const data = await response.json();

      setDatas({
        dates: data.dates,
        counts: data.numTrans,
        profits: data.profits,
      });
      setDataFetched(true);
    } catch (err) {
      setShowError(true);
      setDataFetched(true);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-14 px-2 py-4">
      <div className="font-semibold mb-6 flex justify-between items-end">
        <span>Profit Trend</span>
        <span className="text-sm text-blue-400">last 20 days</span>
      </div>

      {!showError ? (
        <div className="w-full min-h-[16rem] rounded-xl bg-blue-50 overflow-x-auto">
          {dataFetched ? (
            <Graph
              dates={datas.dates}
              counts={datas.counts}
              profits={datas.profits}
            />
          ) : (
            <div className="w-full h-full min-h-[16rem]  flex items-center justify-center">
              <Loader2 h="h-[4rem]" />
            </div>
          )}
        </div>
      ) : (
        <div className="text-red-500 text-sm text-center py-4">
          Sorry an error occured <br /> pls try reloading page
        </div>
      )}
    </div>
  );
}
