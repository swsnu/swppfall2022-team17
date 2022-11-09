import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";

const CafeStatistic: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  return (
    <div className="flex flex-col justify-center h-36 mt-2">
      <div className="border-b-2 border-black w-full mb-2">
        Cafe Statistics
      </div>
      <div className="flex h-full text-center align-middle place mb-2">
        <div className="flex flex-col border border-solid border-black rounded w-2/6 mr-2 place-content-evenly">
          <div className="text-sm font-bold">
            {id && dashboardData[parseInt(id) - 1].best}
          </div>
          <div className="text-3xl">Best</div>
        </div>
        <div className="flex flex-col border border-solid border-black rounded w-2/6 mx-2 place-content-evenly">
          <div className="text-sm font-bold">
            {id && dashboardData[parseInt(id) - 1].reviews}
          </div>
          <div className="text-3xl">Reviews</div>
        </div>
        <div className="flex flex-col border border-solid border-black rounded w-2/6 ml-2 place-content-evenly">
          <div className="text-sm font-bold">
            {id && dashboardData[parseInt(id) - 1].likes}
          </div>
          <div className="text-3xl">Likes</div>
        </div>
      </div>
    </div>
  );
};

export default CafeStatistic;
