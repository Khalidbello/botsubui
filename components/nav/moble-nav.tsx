"use client";

import {
  faAdjust,
  faChartBar,
  faGamepad,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ConfirmLogout from "../confirm-logout";

const Mnav = ({ url }: { url: string | undefined }) => {
  const currentPath = usePathname();
  const router = useRouter();
  const logoutBtRef = useRef<null | HTMLButtonElement>(null);
  const [showConfirmLogOut, setShowConfirmLogout] = useState<boolean>(false);

  const handleConfirmLogOut = () => {
    if (logoutBtRef.current) logoutBtRef.current.style.opacity = "0.5";
    setTimeout(() => {
      if (logoutBtRef.current) logoutBtRef.current.style.opacity = "1";
      setShowConfirmLogout(true);
    }, 500);
  };

  return (
    <>
      <nav className="md:hidden p-1 bg-white flex items-center justify-around w-[97%] rounded-full border-solid border-[2px] border-blue-100 fixed bottom-3 left-[1.5%]">
        <Link
          href={"/admin"}
          className="flex justify-center items-center gap-x-1 p-1"
        >
          <FontAwesomeIcon
            icon={faChartBar}
            className={`text-blue-600 h-4 p-2 rounded-xl ${
              currentPath === "/admin" ? "bg-blue-100" : ""
            }`}
          />
          <span className="text-sm">
            {currentPath === "/admin" && "Staistics"}
          </span>
        </Link>
        <Link
          href={"/admin/controls"}
          className="flex justify-center items-center gap-x-1 p-1"
        >
          <FontAwesomeIcon
            icon={faAdjust}
            className={`text-blue-600 h-4 p-2 rounded-xl ${
              currentPath === "/admin/controls" ? "bg-blue-100" : ""
            }`}
          />
          <span className="text-sm">
            {currentPath === "/admin/controls" && "Controls"}
          </span>
        </Link>
        <Link
          href={"/admin/user-specific"}
          className="flex justify-center items-center gap-x-1 p-1"
        >
          <FontAwesomeIcon
            icon={faUser}
            className={`text-blue-600 h-4 p-2 rounded-xl ${
              currentPath === "/admin/user-specific" ? "bg-blue-100" : ""
            }`}
          />
          <span className="text-sm">
            {currentPath === "/admin/user-specific" && "Users"}
          </span>
        </Link>
        <button
          ref={logoutBtRef}
          onClick={handleConfirmLogOut}
          className="flex justify-center items-center gap-x-1 p-1"
        >
          <FontAwesomeIcon
            icon={faSignOut}
            className={`text-blue-600 h-4 p-2 rounded-xl ${
              false ? "bg-blue-100" : ""
            }`}
          />
          <span className="text-sm"></span>
        </button>
      </nav>
      {showConfirmLogOut && (
        <ConfirmLogout hideLogout={setShowConfirmLogout} url={url} />
      )}
    </>
  );
};
export default Mnav;
