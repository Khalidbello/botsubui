"use client";

import {
  faChartBar,
  faGamepad,
  faSignOut,
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
      <nav className="md:hidden p-1 bg-white flex items-center justify-around w-full rounded-t-[1.5rem] border-solid border-[2px] border-b-0 border-blue-100 fixed bottom-0 left-0">
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
            icon={faGamepad}
            className={`text-blue-600 h-4 p-2 rounded-xl ${
              currentPath === "/admin/controls" ? "bg-blue-100" : ""
            }`}
          />
          <span className="text-sm">
            {currentPath === "/admin/controls" && "Controls"}
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
