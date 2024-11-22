"use client";

import { faBars, faStar, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useRef } from "react";

const MobileNav = () => {
  const btRef = useRef<null | HTMLButtonElement>(null);
  const menuRef = useRef<null | HTMLDivElement>(null);
  const menuRef0 = useRef<null | HTMLDivElement>(null);
  const hideMenuBtRef = useRef<null | HTMLButtonElement>(null);

  const handleClick = () => {
    console.log("Clicked........");
    if (btRef.current) btRef.current.style.opacity = "0.5";
    setTimeout(() => {
      if (btRef.current) btRef.current.style.opacity = "1";
      if (menuRef0.current) menuRef0.current.style.left = "0";
    }, 400);
    setTimeout(() => {
      if (menuRef.current) menuRef.current.style.left = "0";
    }, 500);
  };

  const hideMenu = () => {
    if (hideMenuBtRef.current) hideMenuBtRef.current.style.opacity = "0.5";
    setTimeout(() => {
      if (hideMenuBtRef.current) hideMenuBtRef.current.style.opacity = "1";
      if (menuRef.current) menuRef.current.style.left = "-100%";
    }, 400);
    setTimeout(() => {
      if (menuRef0.current) menuRef0.current.style.left = "-100%";
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        ref={btRef}
        className="flex items-center justify-center bg-red-500 w-7 h-7 rounded-full md:hidden"
      >
        <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-white" />
      </button>
      <Navigator
        hideMenu={hideMenu}
        hideMenuBtRef={hideMenuBtRef}
        menuRef={menuRef}
        menuRef0={menuRef0}
      />
    </>
  );
};

const Navigator: React.FC<{
  hideMenu: React.MouseEventHandler;
  hideMenuBtRef: React.MutableRefObject<HTMLButtonElement | null>;
  menuRef: React.MutableRefObject<HTMLDivElement | null>;
  menuRef0: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ hideMenu, hideMenuBtRef, menuRef, menuRef0 }) => {
  const encodedNumber = encodeURIComponent("08188146243");

  return (
    <div
      onClick={(e) => hideMenu(e)}
      ref={menuRef0}
      className="fixed -left-[100%] top-0 transition-all duration-[500ms] ease-in w-full h-full bg-gray-100 bg-opacity-90 z-10 md:hidden"
    >
      <div
        ref={menuRef}
        className="fixed -left-[100%] top-0  transition-all duration-[500ms] ease-in w-[80%] h-full bg-purple-400 z-10 "
      >
        <button
          onClick={hideMenu}
          ref={hideMenuBtRef}
          className="w-6 h-6 bg-red-500 rounded-full absolute top-3 right-3 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faX} className="text-white h-3 w-3" />
        </button>

        <nav className="flex flex-col items-start gap-y-3 mt-[4rem] text-purple-100 px-4">
          <Link href={"/about"} className="group relative">
            About
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-purple-50 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-1000" />
          </Link>
          <a href={`https://wa.me/${encodedNumber}`} className="group relative">
            Contact
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-purple-50 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-1000" />
          </a>
        </nav>

        <span className="absolute bottom-4 left-4 flex items-center justify-center gap-x-2 text-orange-600 font-semibold font-sans text-lg md:text-xl">
          <FontAwesomeIcon
            className="h-7 md:h-10 text-orange-900"
            icon={faStar}
          />
          BotSub
        </span>
      </div>
    </div>
  );
};

export default MobileNav;
