import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 fixed top-0 left-0 w-full md:relative">
      <div className="container mx-auto p-4 flex items-center justify-between font-semibold text-lg text-white md:text-xl">
        Admin Dashboard
      </div>
    </header>
  );
};

export default Header;
