import dateFormatter from "@/app/utils/date-formatter";
import RollerAnimation from "@/components/bot-landing/roller-white";
import { useRef, useState } from "react";

const UnitTransfer: React.FC<{
  payment: any;
  url: string | undefined;
}> = ({ payment, url }) => {
  const [showSuccesful, setShowSuccesful] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const [doingHook, setDoingHook] = useState<boolean>(false);
  const hookBtRef = useRef<HTMLButtonElement | null>(null);

  const disableBt = () => {
    if (hookBtRef.current) hookBtRef.current.disabled = true;
  };

  const doCustomHook = async (paymentId: string, txRef: string) => {
    setDoingHook(true);

    try {
      const response = await fetch(`${url}/custom-flw-webhook/${payment.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hello: "abfhvd" }),
      });

      if (response.status === 401)
        return setShowError("Please login to continue");
      if (response.status !== 200)
        return setShowError("an error occured trying to run hook");

      const data = await response.json();

      if (data.status) {
        setShowSuccesful(data.message);
        setShowError("");
        disableBt();
      } else {
        setShowError("Custom hook failed");
        setShowSuccesful("");
      }
    } catch (err) {
      console.log("error in retry unit payment", err);
      setShowError("payment failed....");
    } finally {
      setDoingHook(false);
    }
  };

  return (
    <div className="rounded-lg bg-gray-100 py-6 px-4 min-w-[20rem]">
      <p className="flex items-center justify-start gap-3">
        <span className="font-semibold">ID: </span> {payment.id}
      </p>
      <p className="flex items-center justify-start gap-3">
        <span className="font-semibold">E-mail: </span>{" "}
        {payment.customer.customer_email}
      </p>
      <p className="flex items-center justify-start gap-3">
        <span className="font-semibold">Amount: </span> ₦{payment.amount}
      </p>
      <p className="flex items-center justify-start gap-3">
        <span className="font-semibold">Type: </span>{" "}
        {payment.transaction_cycle}
      </p>
      <p className="flex items-center justify-start gap-3">
        <span className="font-semibold">Date: </span>{" "}
        {dateFormatter(payment.date_created)}
      </p>

      {showSuccesful && (
        <div className="text-green-700 text-sm pl-3 mt-3 text-center">
          {showSuccesful}
        </div>
      )}

      {showError && (
        <div className="text-red-500 text-sm pl-3 mt-3 text-center">
          {showError}
        </div>
      )}

      <div className="text-right space-x-4 mt-4">
        <button
          ref={hookBtRef}
          className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full mr-2"
          onClick={() => doCustomHook(payment.id, payment.txRef)}
        >
          {!doingHook ? "Hook" : <RollerAnimation h={"h-[1rem]"} />}
        </button>
      </div>
    </div>
  );
};

export default UnitTransfer;
