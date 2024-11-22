import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Head = () => {
  return (
    <header className="fixed top-0 left-0 flex justify-between items-center px-3 w-full py-2 bg-yellow-100 border-b-[2px] border-orange-100 z-20 md:px-5">
      <span className="font-semibold text-xl md:2xl">About</span>
      <span className="flex items-center justify-center gap-x-3">
        <Link
          href="/"
          className="bg-purple-100 rounded-xl flex items-center justify-center w-7 h-7 hover:opacity-70"
        >
          <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-purple-600" />
        </Link>
        <a
          href=""
          className="relative group text-sm border-l-[2px] py-2 border-gray-500 ml-4 pl-4 transition-all duration-500 ease-in-out"
        >
          Contact
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300" />
        </a>
      </span>
    </header>
  );
};

export default Head;
