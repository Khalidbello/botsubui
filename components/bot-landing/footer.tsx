import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 bg-yellow-100 bg-opacity-80 w-full flex items-center justify-center mt-[5rem] py-4">
      <div className="flex items-center justify-center gap-x-4">
        <a href="">
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="w-4 h-4 text-gray-500"
          />
        </a>
        <a href="">
          <FontAwesomeIcon
            icon={faFacebook}
            className="w-4 h-4 text-gray-500"
          />
        </a>
        <a href="">
          <FontAwesomeIcon
            icon={faLinkedin}
            className="w-4 h-4 text-gray-500"
          />
        </a>
      </div>
      <div className="absolute bottom-3 right-2 text-xs flex items-center justify-center text-gray-500">
        <p className="mr-3">Terms</p>
        <p className="border-l-[2px] border-gray-300 pl-3">privacy</p>
      </div>
    </footer>
  );
};

export default Footer;
