import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Loader2 from "../../loader2";
import {
  Another,
  DateRangeType,
  FilterComponent,
  getCurrentDate,
  mockdataType,
} from "./transactions-stats";
import { useEffect, useState } from "react";

export default function EarningsStats({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [showError, setShowError] = useState<boolean>(false);
  const [data, setData] = useState<mockdataType[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [filterable, setFilterable] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });

  // function to update fiterable
  const updateFilterable = (filterable: boolean) => {
    setFilterable(filterable);
  };

  useEffect(() => {
    setDataFetched(false);
    // Fetch data from API
    fetch(`${url}/statistics/${dateRange.startDate}/${dateRange.endDate}`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "in full statisitics.....................",
            2000000000000000000000
          );
          updateFilterable(false);
          return response.json();
        } else if (response.status === 401) {
          console.log("unauthorized access.....");
          router.push("/admin-login");
        } else {
          throw "Something went wron trying to fetch statisics";
        }
      })
      .then((data) => {
        const newData: mockdataType[] = [
          {
            title: "Total transactions",
            value: data.total,
            type: "",
          },
          {
            title: "Total successful transactions",
            value: data.succcessful,
            type: "",
          },
          {
            title: "Total pending transactions",
            value: data.pending,
            type: "",
          },
          {
            title: "Total profit",
            value: data.profit,
            type: "",
          },
          {
            title: "Average transactiosns per day",
            value: data.average,
            type: "",
          },
        ];
        setData(newData);
        setDataFetched(true);
      })
      .catch((error) => {
        console.log("an error occurred while trying to fetch data", error);
        setDataFetched(true);
        setShowError(true);
      });
  }, [dateRange, router, url]);

  return (
    <div className="mt-16 mx-6 rounded-lg border-[1px] border-blue-300  px-6 py-8 xl:max-w-[70rem] xl:mx-auto">
      <div className="font-semibold mb-2 flex justify-between items-start flex-wrap flex-col md:flex-row md:items-center">
        <span className="mb-2">Transactions </span>
        <FilterComponent
          setDateRange={setDateRange}
          getCurrentDate={getCurrentDate}
          filterable={filterable}
          updateFilterable={updateFilterable}
        />
      </div>
      {showError ? (
        <div className="text-red-500 text-sm text-center">
          An error occured... <br /> please try reloading page
        </div>
      ) : (
        <div className="flex justify-around flex-col screenRow:flex-row flex-wrap  items-stretch gap-6 mt-8">
          {dataFetched ? (
            data.map((ele: mockdataType, index: number) => (
              <Another
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
        </div>
      )}
    </div>
  );
}
