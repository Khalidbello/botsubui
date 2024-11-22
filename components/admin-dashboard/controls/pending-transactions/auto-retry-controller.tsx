import { useEffect, useState } from "react";
import Loader2 from "@/components/admin-dashboard/loader2";

const SlidingButton: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState(true);

  const toggleChecked = () => {
    setShowLoader(true);
    console.log(isChecked);
    // make api request to save new auto retry failed
    setTimeout(() => setIsChecked(!isChecked), 500);
  };

  useEffect(() => {
    // fetch
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, [isChecked]);

  return (
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
  );
};

export default SlidingButton;
