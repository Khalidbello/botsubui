"use client";

import React, { useEffect, useState } from "react";
import UnitIssue from "@/components/admin-dashboard/controls/reported-issues/unit-issue";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import LoadingAnimation from "@/components/admin-dashboard/loader2";

interface Issue {
  id: string;
  description: string;
  date: string;
  reporterId: string;
  platformType: string;
  status: boolean;
}

const ReportedIssues: React.FC<{
  url: string | undefined;
  router: AppRouterInstance;
}> = ({ url, router }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [numberOfIssues, setNumberOfIssues] = useState<number>(0);
  const [showMoreIssueBt, setShowMoreIssueBt] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [pagging, setPagging] = useState<number>(0);

  useEffect(() => {
    setFetchingMore(true);

    fetch(`${url}/reported-issues/${pagging}/5`, { credentials: "include" })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          router.push("/admin-login");
        } else {
          throw "Somehing went wrong fetching reports";
        }
      })
      .then((data) => {
        if (data.length < 4) setShowMoreIssueBt(false);
        console.log(data);
        setIssues([...issues, ...data]);
        setShowLoader(false);
        setFetchingMore(false);
      })
      .catch((err) => {
        console.log("error occured while trying to fetch reported issue", err);
        setFetchingMore(false);
        setShowError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagging, url]);

  return (
    <div className="relative mt-10 h-full rounded-xl px-2 py-4 pb-20 max-w-[70rem] mx-4 md:mx-auto">
      {showError ? (
        <div className="text-sm text-red-500 text-center">
          An error occured trying to fetch issues
        </div>
      ) : showLoader ? (
        <Loader2 h="h-[4rem]" />
      ) : (
        <>
          <div className="flex flex-wrap justify-center items-stretch gap-x-6 gap-y-6">
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <UnitIssue
                  key={index}
                  issue={issue}
                  url={url}
                  router={router}
                />
              ))
            ) : (
              <div className="text-xl text-purple-500 text-center">
                No Reported Issues
              </div>
            )}
          </div>

          {issues.length > 0 &&
            showMoreIssueBt &&
            (fetchingMore ? (
              <LoadingAnimation h="h-[1rem]" />
            ) : (
              <div
                onClick={() => setPagging(pagging + 1)}
                className="text-center text-blue-500"
              >
                {" "}
                <button>see more report</button>
              </div>
            ))}
        </>
      )}
      <span className="fixed flex justify-center items-center bottom-20 right-8 w-16 h-16 rounded-full bg-blue-600 text-white">
        {numberOfIssues}
      </span>
    </div>
  );
};

export default ReportedIssues;
export type { Issue };
