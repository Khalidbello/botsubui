"use client";

import { useEffect, useState } from "react";
import {
  TransactionsFormer,
  mockdataType,
} from "./transaction-stats/transactions-stats";
import { useRouter } from "next/navigation";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Balances({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [balances, setBalances] = useState<mockdataType[]>([]);
  const [showErrorOccured, setShowErrorOccured] = useState<boolean>(false);

  useEffect(() => {
    //setTimeout(() => setDataFetched(true), 2000);
    fetch(`${url}/balances`, { credentials: "include" })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          router.push("/admin-login");
        } else {
          throw "something went wrong";
        }
      })
      .then((data) => {
        console.log("balaces data.................", data);
        const newData: mockdataType[] = [
          {
            title: "Virtual Accounts Balance",
            value: data.virtualAccountBalance,
            type: "total",
          },
          {
            title: "Platform Balance",
            value: data.platformBalance,
            type: "total",
          },
        ];

        setBalances(newData);
        setDataFetched(true);
      })
      .catch((error) => {
        console.log("an error occured........", error);
        setShowErrorOccured(true);
        setDataFetched(true);
      });
  }, [router, url]);

  return (
    <div className="mb-10 mt-16 mx-6 rounded-lg shadow-md px-4 py-8 xl:max-w-[70rem] xl:mx-auto">
      <div className="font-semibold">Balances</div>
      <div className="flex justify-around flex-col screenRow:flex-row items-stretch gap-6 mt-8">
        {dataFetched ? (
          balances.map((ele, index) => (
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

const mockdata: mockdataType[] = [
  {
    title: "Virtual account",
    value: 4000,
    type: "ifi",
  },
  {
    title: "Platform balance",
    value: 5000,
    type: "df",
  },
];
