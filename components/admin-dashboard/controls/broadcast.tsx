import RollerAnimation from "@/components/bot-landing/roller-white";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

const BroadCast: React.FC<{
  url: string | undefined;
  router: AppRouterInstance;
}> = ({ url, router }) => {
  const [platform, setPlatform] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (value: boolean) => {
    setShowModal(value);
  };

  const handleBroadCast = async () => {
    handleShowModal(false);
    setError("");
    setLoading(true);
    setResult("");

    try {
      if (!message) return setError("Message cannot be empty.");
      if (!platform || platform === "null")
        return setError("Please select platform to broadcast to.");

      const response = await fetch(`${url}/send-broadcast`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          platform,
          message,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200) throw "An error occured sendng broadcast";

      const res = await response.json();
      setResult(res);
    } catch (err) {
      setError("Something went wrong sending broadcast message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-full rounded-xl px-4 py-4 pb-24 max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleShowModal(true);
          }}
          className="block mb-8 bg-gray-100 p-6 rounded-md"
        >
          <div className="mb-6">
            <label className="blocks text-sm pr-4">Select platfomr</label>
            <select
              className="rounded-md py-2 px-4"
              onChange={(e) => setPlatform(e.currentTarget.value)}
            >
              <option value="null">Select platform</option>
              <option value="Whatsapp">Whatsap</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="blocks text-sm">Enter message to broadcast</label>
            <textarea
              onChange={(e) => setMessage(e.currentTarget.value)}
              name="message"
              className="h-20 w-full border-1 py-2 px-4 rounded-md"
            ></textarea>
          </div>

          <div className="text-right mt-4">
            <button
              disabled={loading}
              className="bg-blue-600 text-white rounded-md px-4 py-2"
            >
              {loading ? <RollerAnimation h="h-[1.5rem]" /> : "Broadcast"}
            </button>
          </div>
        </form>

        {result ? (
          <p className="w-full gap-y-3 border-1 bg-purple-200 rounded-md p-6 text-center">
            <div>Succesfull broadcast: {result?.totalSent}</div>
            <div>Failed broadcast: {result?.totalFailed}</div>
            <div>
              Could not broadcast due to date range: {result?.totalDateOut}
            </div>
          </p>
        ) : (
          <p className="w-full gap-y-3 border-1 bg-purple-200 rounded-md p-6 text-center">
            No result to display
          </p>
        )}

        {error && (
          <p className="w-full gap-y-3 border-1 bg-purple-200 text-red-500 rounded-md p-6 text-center mt-4">
            {error}
          </p>
        )}
      </div>
      {showModal && (
        <ConfirmModal
          data={{ message, platform }}
          submit={handleBroadCast}
          showModal={handleShowModal}
        />
      )}
    </>
  );
};

// compponent to confirm broadcast
const ConfirmModal: React.FC<{
  data: any;
  submit: () => void;
  showModal: (value: boolean) => void;
}> = ({ data, submit, showModal }) => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-400 bg-opacity-60">
      <div className="max-w-md bg-white p-5 rounded-md">
        <p className="mb-3">Are you sure you want to broadcast: </p>
        <p className="mb-6">{data.message}</p>
        <div className="flex justify-end gap-x-3 items-center">
          <button
            onClick={submit}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md"
          >
            Broadcast
          </button>
          <button
            onClick={() => showModal(false)}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-md"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default BroadCast;
