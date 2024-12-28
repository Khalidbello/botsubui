"use client";

import { useState } from "react";
import LoadingAnimation from "../loader2";

const ProfitUp = () => {
  const [loading, isLoading] = useState<boolean>(true);
  const [fetchingMore, setfetchinMore] = useState<boolean>(false);
  const [usersStats, setUserStats] = useState<any>([]);

  if (loading) {
    return (
      <div className="w-full h-[90%] flex items-center justify-center">
        <LoadingAnimation h="h-[5rem]" />
      </div>
    );
  }

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ProfitUp;
