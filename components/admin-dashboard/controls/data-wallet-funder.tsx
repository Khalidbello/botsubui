import RollerAnimation from "@/components/bot-landing/roller-white";
import React, { useEffect, useState } from "react";

const FundComponent: React.FC<{ url: string | undefined }> = ({ url }) => {
  const [amount, setAmount] = useState<string>("");
  const [accountInfo, setAccountInfo] = useState({
    accountName: "Demo Name",
    accountNumber: "1234567897",
  });
  const [error, setError] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [fundError, setFundError] = useState("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleFund = async () => {
    setSuccess("");
    setFundError("");
    setProcessing(true);

    try {
      if (!amount) return setFundError("Enter a valid amount");

      const response = await fetch(`${url}/fund-wallet`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ amount }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) throw "Something went wrong runnig tranfers";

      const data = await response.json();
      if (data.status === true) {
        setSuccess("Data wallet funding succesfull");
        setFundError("");
      } else {
        setSuccess("");
        setFundError("Something went wrong funding data wallet try again");
      }
    } catch (err) {
      console.error("An error occured funding wallet: ", err);
      setFundError("An error occured making fund wallet request");
    } finally {
      setProcessing(false);
    }
  };

  // function to fetch account details
  const fetchAccountDetails = async () => {
    try {
      const response = await fetch(`${url}/transfer-account-info`, {
        credentials: "include",
      });

      if (response.status !== 200)
        throw "Something went wrong fetching transfer account details";

      const data = await response.json();
      setAccountInfo({ ...accountInfo, ...data });
    } catch (err) {
      setError("An error occured getting getting transfer account info.");
    } finally {
    }
  };

  useEffect(() => {
    fetchAccountDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 text-center p-10 text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <div className="flex items-center">
        <input
          type="number"
          className="w-[70%] border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          disabled={processing}
          onClick={handleFund}
        >
          {processing ? <RollerAnimation h="h-[1.3rem]" /> : "Fund"}
        </button>
      </div>
      <p className="mt-4">
        <span className="block">Accont name: {accountInfo.accountName}</span>
        <span className="block">
          Account number: {accountInfo.accountNumber}
        </span>
      </p>

      {success && (
        <p className="text-center text-sm text-green-600 my-2">{success}</p>
      )}
      {fundError && (
        <p className="text-center text-sm text-red-600 my-2">{fundError}</p>
      )}
    </div>
  );
};

export default FundComponent;
