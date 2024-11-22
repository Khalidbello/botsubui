"use client";

import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
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
          <FontAwesomeIcon icon={faX} className="text-white h-3" />
        </button>
        <nav className="flex flex-col gap-y-3">
          <span>About</span>
          <span>Contact</span>
        </nav>
        <span></span>
      </div>
    </div>
  );
};

export default MobileNav;
