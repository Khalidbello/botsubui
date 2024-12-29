"use client";

import GenericStats from "@/components/admin-dashboard/user-specific-stats/generic-stats";
import ProfitUp from "@/components/admin-dashboard/user-specific-stats/profit-up";
import {
  faArrowDown,
  faArrowUp,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const Page = () => {
  const [inView, setInView] = useState<string>("profitUp");
  const [tempele, setTempele] = useState<HTMLButtonElement | null>(null);
  const profitUpBtRef = useRef<HTMLButtonElement | null>(null);
  const profitDownBtRef = useRef<HTMLButtonElement | null>(null);
  const genericBtRef = useRef<HTMLButtonElement | null>(null);

  // fucntion to handle change of view
  const changeView = (e: React.MouseEvent<HTMLButtonElement>, info: string) => {
    if (info === "profitUp" && profitUpBtRef?.current)
      profitUpBtRef.current.style.opacity = "0.6";
    if (info === "profitDown" && profitDownBtRef?.current)
      profitDownBtRef.current.style.opacity = "0.6";
    if (info === "generic" && genericBtRef?.current)
      genericBtRef.current.style.opacity = "0.6";

    setTimeout(() => {
      if (info === "profitUp" && profitUpBtRef?.current)
        profitUpBtRef.current.style.opacity = "1";
      if (info === "profitDown" && profitDownBtRef?.current)
        profitDownBtRef.current.style.opacity = "1";
      if (info === "generic" && genericBtRef?.current)
        genericBtRef.current.style.opacity = "1";
    }, 250);

    setTimeout(() => setInView(info), 260);
  };

  return (
    <div className="w-full h-full">
      <header className="w-full flex items-center justify-center gap-4 p-4">
        <button
          ref={profitUpBtRef}
          onClick={(e) => changeView(e, "profitUp")}
          className={`flex items-center justify-center gap-2 h-full ${
            inView === "profitUp" && "border-b-2 border-b-blue-300"
          }`}
        >
          Profits
          <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3 text-blue-600" />
        </button>
        <span className="w-[2px] h-[2rem] bg-gray-300"></span>
        <button
          ref={profitDownBtRef}
          onClick={(e) => changeView(e, "profitDown")}
          className={`flex items-center justify-center gap-2 h-full ${
            inView === "profitDown" && "border-b-2 border-b-blue-300"
          }`}
        >
          Profits
          <FontAwesomeIcon
            icon={faArrowDown}
            className="w-3 h-3 text-blue-600"
          />
        </button>
        <span className="w-[2px] h-[2rem] bg-gray-300"></span>
        <button
          ref={genericBtRef}
          onClick={(e) => changeView(e, "generic")}
          className={`flex items-center justify-center gap-2 h-full ${
            inView === "generic" && "border-b-2 border-b-blue-300"
          }`}
        >
          Generic
          <FontAwesomeIcon icon={faGlobe} className="w-3 h-3 text-blue-600" />
        </button>
      </header>

      {inView === "profitUp" && <ProfitUp />}
      {inView === "profitDown" && <GenericStats />}
      {inView === "generic" && <GenericStats />}
    </div>
  );
};

export default Page;
