import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileNav from "./mobile-nav";

const Header = () => {
  const encodedNumber = encodeURIComponent("08188146243");

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between gap-x-10 px-5 py-2 bg-yello-100 bg-opacity-80 z-10">
      <span className="flex items-center justify-center gap-x-1 text-gray-600 font-semibold font-sans text-lg md:text-xl">
        <Image
          src="/logo.png"
          alt="logo for botsub"
          width={500}
          height={500}
          className="w-[2rem]"
        />
        BotSub
      </span>
      <nav className="text-gray-500 font-mono hidden md:block">
        <a
          href="/about"
          className="relative group border-l-[2px] py-2  border-transparent ml-4 pl-4 transition-all duration-500 ease-in-out"
        >
          About
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300" />
        </a>
        <a
          href={`https://wa.me/${encodedNumber}`}
          className="relative group border-l-[2px] py-2 border-gray-500 ml-4 pl-4 transition-all duration-500 ease-in-out"
        >
          Contact
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300" />
        </a>
      </nav>
      <MobileNav />
    </header>
  );
};

export default Header;
