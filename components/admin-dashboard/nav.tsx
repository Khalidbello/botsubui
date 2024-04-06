'use client';
// arctic human start cancel kid picture cushion surprise cloth tonight off purchase
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHome, faCog, faUser, faChartBar } from "@fortawesome/free-solid-svg-icons";
//import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname();

    return (
        <nav className="px-5 flex flex-col items-stretch gap-y-4 w-full h-full pt-20">
            <div className="bg-orange-600 text-white text-center text-2xl font-semibold inline px-6 py-2 rounded-full">BotSub</div>
            <div className="flex flex-col items-stretch gap-y-4 mt-8 bg-white px-5 py-6 rounded-xl">
                <Link href={'/admin-dashboard'} className={`hover:bg-orange-300 bg-orange-100 text-center text-orange-600 rounded-full px-4 py-1 ${path === '/admin-dashboard' && 'bg-orange-200 font-semibold text-lg'} `}> Dashboard </Link>
                <Link href={'/transactions-dashboard'} className="hover:bg-orange-300 bg-orange-100 text-center text-orange-600 rounded-full px-4 py-1"> Transactions </Link>
                <Link href={'admin-dashboard'} className="mt-8 hover:bg-orange-300 bg-orange-100 text-center text-orange-600 rounded-full px-4 py-1"> Logout </Link>
            </div>
        </nav>
    )
}