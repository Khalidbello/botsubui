import Mnav from "@/components/nav/moble-nav";
import { NavBar } from "@/components/nav/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url: string | undefined = process.env.NEXT_PUBLIC_URL;
  return (
    <div className="w-full h-full flex items-stretch relative">
      <div className="hidden md:block bg-gray-200 border-[2px] border-r-gray-100 min-w-[15rem] w-[15rem] h-full">
        <NavBar url={url} />
      </div>
      <div className="flex-grow overflow-y-auto pb-12">
        {children}
        <Mnav url={url} />
      </div>
    </div>
  );
}
