"use client";

import UsersStatistics from "@/components/admin-dashboard/user-specific-stats/generic-stats";
import ProfitUp from "@/components/admin-dashboard/user-specific-stats/profit-up";
import WhatsappUsersListing from "@/components/admin-dashboard/user-specific-stats/whatsapp-users-listing/listing";
import {
  faArrowDown,
  faArrowUp,
  faChartBar,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const Page = () => {
  const [inView, setInView] = useState("usersStats");
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
    <div className="w-full h-full overflow-y-auto">
      <header className="w-full flex items-center justify-center gap-4 p-4">
        <button
          ref={profitDownBtRef}
          onClick={(e) => changeView(e, "usersStats")}
          className={`flex items-center justify-center gap-2 h-full ${
            inView === "usersStats" && "border-b-2 border-b-blue-300"
          }`}
        >
          Statistics
          <FontAwesomeIcon
            icon={faArrowDown}
            className="w-3 h-3 text-blue-600"
          />
        </button>
        <span className="w-[2px] h-[2rem] bg-gray-300"></span>
        <button
          ref={genericBtRef}
          onClick={(e) => changeView(e, "charts")}
          className={`flex items-center justify-center gap-2 h-full ${
            inView === "charts" && "border-b-2 border-b-blue-300"
          }`}
        >
          Charts
          <FontAwesomeIcon
            icon={faChartBar}
            className="w-3 h-3 text-blue-600"
          />
        </button>
        <span className="w-[2px] h-[2rem] bg-gray-300"></span>
        <button
          ref={genericBtRef}
          onClick={(e) => changeView(e, "whatsappUsersListing")}
          className={`flex items-center justify-center gap-2 h-full ${
            inView === "whatsappUsersListing" && "border-b-2 border-b-blue-300"
          }`}
        >
          WhataApp Users
          <FontAwesomeIcon
            icon={faChartBar}
            className="w-3 h-3 text-blue-600"
          />
        </button>
      </header>

      {inView === "usersStats" && <UsersStatistics />}
      {inView === "charts" && <UsersStatistics />}
      {inView === "whatsappUsersListing" && <WhatsappUsersListing />}
    </div>
  );
};

export default Page;
