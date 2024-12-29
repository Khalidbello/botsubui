"use client";

import { useRouter } from "next/navigation";
import {
  TransactionsFormer,
  mockdataType,
} from "@/components/admin-dashboard/statistics/transaction-stats/transactions-stats";
import { useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function ToDaysEarning({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [datas, setDatas] = useState<mockdataType[]>([]); // Declare datas state variable
  const [showErrorOccured, setShowErrorOccured] = useState<boolean>(false);

  useEffect(() => {
    // Fetch data from API
    console.log("url in tdays stats, ", url);
    fetch(`${url}/todays-statisitics`, { credentials: "include" })
      .then((response) => {
        console.log("response in todays statistics, ", response);
        if (response.status === 200) {
          console.log(2000000000000000000000);
          return response.json();
        } else if (response.status === 401) {
          console.log("push to login....... in todays earnig.........");
          router.push("/admin-login");
        } else {
          throw "something went wrong trying o fetch todays statistics";
        }
      })
      .then((data) => {
        const newData: mockdataType[] = [
          {
            title: "Total transactions",
            value: data.total,
            type: "total",
          },
          {
            title: "Successful transactions",
            value: data.succcessful,
            type: "successful",
          },
          {
            title: "Pending transactions",
            value: data.pending,
            type: "pending",
          },
          {
            title: "Todays profit",
            value: data.profit,
            type: "",
          },
        ];
        console.log(newData);
        setDatas(newData); // Set the datas state variable with fetched data
        setDataFetched(true);
      })
      .catch((error) => {
        console.log("an error occurred while trying to fetch data", error);
        setShowErrorOccured(true);
        setDataFetched(true);
      });
  }, [router, url]);

  return (
    <div className="mt-20 mx-6 rounded-lg shadow-md px-6 py-8 xl:max-w-[70rem] xl:mx-auto">
      <div className="font-semibold">Todays Earning</div>
      <div className="flex justify-around flex-col screenRow:flex-row items-stretch gap-6 mt-8">
        {dataFetched ? (
          datas.map((ele, index) => (
            <TransactionsFormer
              key={index}
              router={router}
              title={ele.title}
              value={ele.value}
              type={ele.type}
            />
          ))
        ) : (
          <Loader2 h="h-[4rem]" />
        )}
        {showErrorOccured && (
          <div className="text-center text-red-400">
            Sorry and error occurred <br /> Please try reloading page{" "}
          </div>
        )}
      </div>
    </div>
  );
}
