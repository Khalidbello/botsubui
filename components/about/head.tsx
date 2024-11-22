import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Head = () => {
  return (
    <header className="fixed top-0 left-0 flex justify-between items-center px-3 w-full py-2 bg-yellow-100 border-b-[2px] border-orange-100 z-20 md:px-5">
      <span className="font-semibold text-xl md:2xl">About</span>
      <Link
        href="/"
        className="bg-purple-100 rounded-xl flex items-center justify-center w-7 h-7"
      >
        <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-purple-600" />
      </Link>
    </header>
  );
};

export default Head;
