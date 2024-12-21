import { useRef, useState } from "react";
import { Issue } from "@/components/admin-dashboard/controls/reported-issues/reported-issues";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import TogggleBotResponse from "./toggle-bot-reponse";

interface UnitIssueProp {
  issue: Issue;
  url: string | undefined;
  router: AppRouterInstance;
}

const UnitIssue: React.FC<UnitIssueProp> = ({ issue, url, router }) => {
  const [showEmptyError, setShowEmptyError] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [showIssueClosed, setShowIssueClosed] = useState<boolean>(false);
  const submitBt = useRef<HTMLButtonElement | null>(null);
  const closeBt = useRef<HTMLButtonElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
    setShowEmptyError(false);
    setShowError(false);
    setMessageSent(false);
  };

  const closeIssue = () => {
    fetch(`${url}/close-issue/${issue.id}/${issue.reporterId}`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ issue: issue.description }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          router.push("/admin-login");
        } else {
          throw "an error occured deleting issue";
        }
      })
      .then((data) => {
        if (submitBt.current) {
          submitBt.current.style.opacity = "0.4";
          submitBt.current.disabled = true;
        }
        if (closeBt.current) {
          closeBt.current.style.opacity = "0.4";
          closeBt.current.disabled = true;
        }
        setShowIssueClosed(true);
      })
      .catch((err) => {
        setShowError(true);
        console.log("error in close issue", err);
      });
  };

  const handleResponseSubmit = () => {
    if (!response) return setShowEmptyError(true);
    if (submitBt.current) submitBt.current.style.opacity = "0.5";

    const postData = {
      reporterId: issue.reporterId,
      platformType: issue.platformType,
      response: response,
      id: issue.id,
    };

    const requestOptions: any = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
        // Add any other headers if required
      },
      body: JSON.stringify(postData), // Convert JavaScript object to JSON string
    };

    fetch(`${url}/send-issue-response`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        // Handle response data
        console.log("Response from server:", data);
        if (submitBt.current) submitBt.current.style.opacity = "1";
        setMessageSent(true);
        setShowError(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error in update network:", error);
        setShowError(true);
        setMessageSent(false);
        setShowEmptyError(false);
        if (submitBt.current) submitBt.current.style.opacity = "1";
      });
  };

  return (
    <div className="min-w-[18rem] max-w-xl flex-1 bg-white rounded-lg shadow-md p-4">
      <p className="mb-2 text-sm">
        <span className="font-semibold">Description: </span>
        {issue.description}
      </p>
      <textarea
        className="w-full h-20 border border-gray-300 rounded-md px-2 py-1 mb-2"
        placeholder="Enter response..."
        onChange={(event) => handleInputChange(event)}
      ></textarea>

      {showIssueClosed && (
        <div className="text-blue-500 text-sm px-4">
          <span className="text-semibold">Issue has been closed</span>{" "}
          {response}
        </div>
      )}
      {messageSent && (
        <div className="text-green-500 text-sm px-4">
          <span className="text-semibold">Message sent:</span> {response}
        </div>
      )}
      {showEmptyError && (
        <div className="text-red-500 text-sm px-4">
          Response {`can'nt`} be empty
        </div>
      )}
      {showError && (
        <div className="text-red-500 text-sm px-4">
          Sorry an error occured...
        </div>
      )}

      <div className="flex justify-end gap-x-6 items-center text-sm">
        <span>
          <span className="font-semibold">IssueId:</span> {issue.id}
        </span>
        <span className="text-xs">{issue.date}</span>
      </div>

      <div className="text-right space-x-5 mt-4 flex items-center justify-end gap-x-2 text-xs">
        <TogggleBotResponse senderId={issue.reporterId} url={url} />
        <button
          ref={closeBt}
          className="bg-red-50 text-red-600 rounded-full px-6 py-2"
          onClick={() => closeIssue()}
        >
          Close issue
        </button>
        <button
          ref={submitBt}
          className="bg-blue-50 text-blue-600 rounded-full px-6 py-2"
          onClick={() => handleResponseSubmit()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UnitIssue;
