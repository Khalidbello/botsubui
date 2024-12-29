"use client";

import { useEffect, useState } from "react";
import LoadingAnimation from "../loader2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsDownToLine,
  faBars,
  faHistory,
  faMoneyBill,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faBilibili } from "@fortawesome/free-brands-svg-icons";

const ProfitUp = () => {
  const [isLoading, seIsLoading] = useState<boolean>(true);
  const [fetchingMore, setfetchinMore] = useState<boolean>(false);
  const [usersStats, setUserStats] = useState<any>([]);

  // function to fetch data
  const fetchData = () => {
    try {
    } catch (err) {
    } finally {
      seIsLoading(false);
      setfetchinMore(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchData(), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[90%] flex items-center justify-center">
        <LoadingAnimation h="h-[5rem]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start gap-5 w-full p-4">
      <UnitUserStats />
      <UnitUserStats />
    </div>
  );
};

const UnitUserStats = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 w-full p-4 rounded-xl border-[1px] border-blue-100">
      <div className="flex items-center justify-start">
        <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-blue-400" />{" "}
        <div className="flex items-center justify-start pl-4">
          <span className="text-lg pr-2">uid:</span>
          <span>12345789</span>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-violet-400" />{" "}
        <div className="flex items-center justify-start pl-4">
          <span className="text-lg pr-2">Total transactions:</span>
          <span>400</span>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <FontAwesomeIcon icon={faHistory} className="w-5 h-5 text-blue-400" />{" "}
        <div className="flex items-center justify-start pl-4">
          <span className="text-lg pr-2">Last transaction:</span>
          <span>thu 26-12-2024</span>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <FontAwesomeIcon icon={faWallet} className="w-5 h-5 text-yellow-400" />{" "}
        <div className="flex items-center justify-start pl-4">
          <span className="text-lg pr-2">Wallet balance:</span>
          <span>$100</span>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <FontAwesomeIcon
          icon={faArrowsDownToLine}
          className="w-5 h-5 text-cyan-400"
        />{" "}
        <div className="flex items-center justify-start pl-4">
          <span className="text-lg pr-2">Total funding: </span>
          <span>$150</span>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <FontAwesomeIcon
          icon={faMoneyBill}
          className="w-5 h-5 text-green-400"
        />{" "}
        <div className="flex items-center justify-start pl-4">
          <span className="text-lg pr-2">Profit:</span>
          <span>$50</span>
        </div>
      </div>
    </div>
  );
};

export default ProfitUp;
