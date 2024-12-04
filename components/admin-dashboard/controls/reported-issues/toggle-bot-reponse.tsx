import { useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";

interface TogggleBotResponseProps {
  url: string | undefined;
  senderId: string;
}

const TogggleBotResponse: React.FC<TogggleBotResponseProps> = ({
  url,
  senderId,
}) => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState(false);

  // fucntiion to fetch current state of auto retry from server
  const fetchAutoRetryStatus = async () => {
    try {
      const response = await fetch(`${url}/get-bot-response/${senderId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200) throw "Something went wrong";

      const data = await response.json();
      setIsChecked(data.botResposne);
    } catch (err) {
      console.error(
        "An error occured in fetching the status of auto retry",
        err
      );
    } finally {
      setShowLoader(false);
    }
  };

  const toggleChecked = async () => {
    setShowLoader(true);

    try {
      const response = await fetch(`${url}/set-bot-response/${senderId}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ setTo: !isChecked }),
      });

      if (response.status !== 200)
        throw "An error occured updating bot response";

      const data = await response.json();
      setIsChecked(data.settedTo);
    } catch (err) {
      console.error("An error occured updating auto retry", err);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchAutoRetryStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <p>Bot auto response: </p>
      <div onClick={toggleChecked} className="relative inline-block w-12 h-6">
        {showLoader ? (
          <Loader2 h="h-[0.8rem]" />
        ) : (
          <>
            <div
              className={`w-full h-full rounded-full transition-colors duration-300 ${
                isChecked ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute top-0 right-6 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md transition-transform duration-300 ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TogggleBotResponse;
