"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import LoadingAnimation from "./admin-dashboard/loader2";

interface ConfirmLogoutProps {
  hideLogout: React.Dispatch<React.SetStateAction<boolean>>;
  url: string | undefined;
}

const ConfirmLogout: React.FC<ConfirmLogoutProps> = ({ hideLogout, url }) => {
  const router = useRouter();
  const noBtRef = useRef<null | HTMLButtonElement>(null);
  const yesBtRef = useRef<null | HTMLButtonElement>(null);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  // funttion to handle logging out
  // helper function to handle logout
  const logOut = async () => {
    setLoggingOut(true);

    try {
      const response = await fetch(`${url}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        router.push("/admin-login");
        return;
      }
      throw "errror";
    } catch (err) {
      setLoggingOut(false);
      alert("Failed to logout");
    }
  };

  const cancleLogout = () => {
    if (noBtRef.current) noBtRef.current.style.opacity = "0.5";

    setTimeout(() => {
      if (noBtRef.current) noBtRef.current.style.opacity = "1";
      hideLogout(false);
    }, 200);
  };

  return (
    <div className="fixed top-0 right-0 w-full h-full z-50 flex justify-center items-center bg-blue-500 bg-opacity-70">
      <div className="px-6 py-4 rounded-xl bg-white">
        <p className="mb-4">Are you sure you want to log out...?</p>
        <div className="flex justify-end items-center gap-x-2">
          <button
            ref={yesBtRef}
            onClick={logOut}
            className="px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm"
          >
            {loggingOut ? <LoadingAnimation h={"h-2"} /> : "Yes"}
          </button>
          <button
            ref={noBtRef}
            onClick={cancleLogout}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogout;
