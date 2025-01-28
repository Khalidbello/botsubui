"use client";

import { useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import FundComponent from "./data-wallet-funder";

interface networksType {
  name: string;
  active: boolean;
  info: string;
}

export default function DataNetworkStatus({
  url,
  router,
}: {
  url: string | undefined;
  router: AppRouterInstance;
}) {
  const [networks, setNetworks] = useState<networksType[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);

  const handleNetworkToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    network: string,
    active: boolean
  ) => {
    e.currentTarget.style.opacity = "0.4";

    // Send a request to the server to activate or deactivate the network
    const postData = {
      network,
      status: !active,
      info: !active ? "Activated by admin" : "Deactivated by admin",
    };

    try {
      const response = await fetch(`${url}/network-status`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 401) return router.push("/admin-login");
      if (response.status !== 200)
        throw "An error occured updating network status";

      setShowLoader(true);
    } catch (err) {
      // Handle errors
      console.error("Error in update network:", err);
      setShowError(false);
    }
  };

  useEffect(() => {
    // make fetch request to get datanetwork current statsu
    fetch(`${url}/network-status`, { credentials: "include" })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw "an error occured file fetching network status";
        }
      })
      .then((data) => {
        console.log(data["MTN"], data, "data for net stats.......");
        setNetworks([
          {
            name: "MTN",
            active: data["MTN"]["status"],
            info: data["MTN"]["info"],
          },
          {
            name: "Airtel",
            active: data["Airtel"]["status"],
            info: data["Airtel"]["info"],
          },
          {
            name: "Glo",
            active: data["Glo"]["status"],
            info: data["Glo"]["info"],
          },
          {
            name: "9mobile",
            active: data["9mobile"]["status"],
            info: data["9mobile"]["info"],
          },
        ]);
        setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        //setShowError(true);
        setShowLoader(true);
      });
  }, [showLoader, url]);

  return (
    <div className="mt-10 px-6 py-4 max-w-xl mx-4 screen1:mx-auto">
      {showError ? (
        <div className="text-sm text-red-500 text-center">
          Sorry an error occured... <br /> pls try reloading page
        </div>
      ) : showLoader ? (
        <Loader2 h="h-[4rem]" />
      ) : (
        <>
          <div className="flex items-center justify-center gap-x-8 gap-y-6 flex-wrap">
            {networks.map((network, index) => (
              <div key={index} className="flex items-center space-x-2">
                <button
                  className={`${
                    network.active
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  } px-4 py-2 rounded-full`}
                  onClick={(e) =>
                    handleNetworkToggle(e, index, network.name, network.active)
                  }
                >
                  {network.name}
                </button>
                <div
                  className={`w-4 h-4 rounded-full ${
                    network.active ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-xl border-[1px] border-blue-300 p-6 rounded-xl mt-16 mb-20">
            {networks.map((network, index) => (
              <p
                key={index}
                className="flex items-center jusitfy-start gap-x-4 mb-3"
              >
                <span className="font-semibold">{network.name}: </span>
                <span>{network.info}</span>
              </p>
            ))}
          </div>

          <FundComponent url={url} />
        </>
      )}
      <div className="h-[10rem] w-full"></div>
    </div>
  );
}
