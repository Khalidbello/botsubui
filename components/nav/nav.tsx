"use client";
// arctic human start cancel kid picture cushion surprise cloth tonight off purchase
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faSignOut,
  faChartBar,
  faAdjust,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const NavBar = ({ url }: { url: string | undefined }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <nav className="px-5 flex flex-col items-stretch gap-y-4 w-full h-full pt-20">
      <div className="bg-blue-600 text-white text-center text-2xl font-semibold inline px-6 py-2 rounded-full">
        BotSub
      </div>
      <div className="flex flex-col items-stretch gap-y-4 mt-8 bg-white px-5 py-6 rounded-xl">
        <Link
          href={"/admin"}
          className={`flex items-center justify-center hover:bg-blue-300 bg-blue-100 text-center rounded-full px-4 py-1 ${
            path === "/admin" ? "bg-blue-500 text-white" : "text-blue-600 "
          } `}
        >
          <FontAwesomeIcon
            icon={faChartBar}
            className={`${
              path === "/admin" ? "bg-blue-500 text-white" : "text-blue-600 "
            } h-4 p-2 rounded-xl}`}
          />
          Statistics
        </Link>
        <Link
          href={"/admin/controls"}
          className={`flex items-center justify-center hover:bg-blue-300 bg-blue-100 text-center rounded-full px-4 py-1 ${
            path === "/admin/controls"
              ? "bg-blue-500 text-white"
              : "text-blue-600 "
          } `}
        >
          <FontAwesomeIcon
            icon={faAdjust}
            className={`${
              path === "/admin/controls"
                ? "bg-blue-500 text-white"
                : "text-blue-600 "
            } h-4 p-2 rounded-xl}`}
          />
          Controls
        </Link>
        <Link
          href={"/admin/user-specific"}
          className={`flex items-center justify-center hover:bg-blue-300 bg-blue-100 text-center rounded-full px-4 py-1 ${
            path === "/admin/user-specific"
              ? "bg-blue-500 text-white"
              : "text-blue-600 "
          } `}
        >
          <FontAwesomeIcon
            icon={faUser}
            className={`${
              path === "/admin/user-specific"
                ? "bg-blue-500 text-white"
                : "text-blue-600 "
            } h-4 p-2 rounded-xl}`}
          />
          Users
        </Link>

        <button
          onClick={() => logOut(url, router)}
          className="flex items-center justify-center mt-8 hover:bg-blue-300 bg-blue-100 text-center text-blue-600 rounded-full px-4 py-1"
        >
          <FontAwesomeIcon
            icon={faSignOut}
            className={`text-blue-600 h-4 p-2 rounded-xl ${
              false ? "bg-blue-100" : ""
            }`}
          />
          Logout
        </button>
      </div>
    </nav>
  );
};

// helper function to handle logout
const logOut = async (url: string | undefined, router: AppRouterInstance) => {
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
    alert("Failed to logout");
  }
};

export { NavBar };
