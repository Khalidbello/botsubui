'use client';
// arctic human start cancel kid picture cushion surprise cloth tonight off purchase
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHome, faCog, faUser, faChartBar } from "@fortawesome/free-solid-svg-icons";
//import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname();

    const logOut = () => {

    };

    return (
        <nav className="px-5 flex flex-col items-stretch gap-y-4 w-full h-full pt-20">
            <div className="bg-blue-600 text-white text-center text-2xl font-semibold inline px-6 py-2 rounded-full">BotSub</div>
            <div className="flex flex-col items-stretch gap-y-4 mt-8 bg-white px-5 py-6 rounded-xl">
                <Link href={'/admin-dashboard'} className={`hover:bg-blue-300 bg-blue-100 text-center rounded-full px-4 py-1 ${path === '/admin-dashboard' ? 'bg-blue-400 text-white' : 'text-blue-600 '} `}> Statistics </Link>
                <Link href={'/admin-dashboard/controls'} className={`hover:bg-blue-300 bg-blue-100 text-center rounded-full px-4 py-1 ${path === '/admin-dashboard/controls' ? 'bg-blue-400 text-white' : 'text-blue-600 '} `}> Controls </Link>
                <button onClick={logOut} className="mt-8 hover:bg-blue-300 bg-blue-100 text-center text-blue-600 rounded-full px-4 py-1"> Logout </button>
            </div>
        </nav>
    )
}