import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";

const CafeStatisticForm: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  return (
    <div className="flex flex-col justify-center h-36">
      <div className="border-b-2 border-black w-full mb-2">
        Cafe Introduction
      </div>
      <div className="flex h-full text-center align-middle">
        <div className="flex flex-col border border-solid border-black rounded w-2/6 mr-2">
            {id && dashboardData[parseInt(id)-1].best}
            <div className="text-3xl">Best</div>
        </div>
        <div className="flex flex-col border border-solid border-black rounded w-2/6 mx-2">
            {id && dashboardData[parseInt(id)-1].reviews}
            <div className="text-3xl">Reviews</div>
        </div>
        <div className="flex flex-col border border-solid border-black rounded w-2/6 ml-2">
            {id && dashboardData[parseInt(id)-1].likes}
            <div className="text-3xl">Likes</div>
        </div>
      </div>
    </div>
  );
};

export default CafeStatisticForm;
