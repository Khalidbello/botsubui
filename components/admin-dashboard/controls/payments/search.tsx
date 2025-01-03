"use client";

import Image from "next/image";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import UnitTransfer from "./unit-payment";

const PaymentSearch: React.FC<{
  payments: any[];
  show: React.Dispatch<React.SetStateAction<boolean>>;
  url: any;
}> = ({ payments, show, url }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [result, setResult] = useState<any[]>([]);
  const [searchType, setSearchType] = useState<string>("email");
  const hideBtRef = useRef<HTMLButtonElement | null>(null);

  // handler to hide search section
  const hide = () => {
    if (hideBtRef.current) hideBtRef.current.style.opacity = "0.5";

    setTimeout(() => {
      if (hideBtRef.current) hideBtRef.current.style.opacity = "1";
    }, 210);
    setTimeout(() => show(false), 230);
  };

  // update seachValue
  const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    let holder = [];
    console.log(searchType);
    if (searchType === "email")
      holder = payments.filter((payment: any) => {
        console.log("in filter: ", payment);
        return payment.customer.customer_email === event.target.value;
      });

    if (searchType === "id")
      holder = payments.filter((payment: any) => {
        console.log("in filter: ", payment);
        return payment.id === event.target.value;
      });

    console.log("holder ooo:     ", holder);
    setResult(holder);
  };

  // update serch type
  const updateSearchType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full px-3 bg-white">
      <button
        ref={hideBtRef}
        onClick={hide}
        className="flex items-center justify-center absolute top-4 right-4 w-8 h-8 rounded-full bg-red-100"
      >
        <FontAwesomeIcon icon={faX} className="h-4 text-red-600" />
      </button>
      <div className="flex items-center jsutify-center mt-16 w-full">
        <input
          value={searchValue}
          onChange={updateSearchValue}
          placeholder="searh..."
          className="h-10 bg-blue-100 rounded-l-full w-full px-3"
        />
        <select
          value={searchType}
          onChange={updateSearchType}
          className="rounded-r-full h-10 w-24  bg-blue-500 text-white px-3 appearance-none border border-gray-600 focus:outline-none focus:ring-2  focus:ring-blue-500"
        >
          <option value="email">Email</option>
          <option value="id">ID</option>
        </select>
      </div>
      <div className="h-full w-full overflow-auto">
        {result.length < 1 ? (
          <div className="flex flex-col justify-center gap-4 items-center min-h-[80%] w-full mt-8 ">
            <Image
              alt={"search image"}
              src={"/search-img.jpeg"}
              width={500}
              height={500}
              className="h-[7rem] object-contain"
            />
            <h2>No Search Result Found</h2>
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-shrink items-start flex-wrap gap-x-8 gap-y-6 mt-8">
              {result.map((payment, index) => (
                <UnitTransfer key={index} payment={payment} url={url} />
              ))}
            </div>
            <div className="h-[12rem]"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSearch;
