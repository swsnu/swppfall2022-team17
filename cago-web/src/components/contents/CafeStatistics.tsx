import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";
import ComponentContainer from "components/contents/ComponentContainer";

const CafeStatistic: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  return (
    <ComponentContainer title="Cafe Statistics">
      <div className="flex h-full text-center align-middle place mb-2">
        <div className="bg-slate-50 shadow-lg flex flex-col rounded w-2/6 mr-2 place-content-evenly py-4">
          <div className="text-3xl">Best</div>
          <div>{id && dashboardData[parseInt(id) - 1].best}</div>
        </div>
        <div className="bg-slate-50 shadow-lg flex flex-col rounded w-2/6 mr-2 place-content-evenly py-4">
          <div className="text-3xl">Reviews</div>
          <div>{id && dashboardData[parseInt(id) - 1].reviews}</div>
        </div>
        <div className="bg-slate-50 shadow-lg flex flex-col rounded w-2/6 mr-2 place-content-evenly py-4">
          <div className="text-3xl">Likes</div>
          <div>{id && dashboardData[parseInt(id) - 1].likes}</div>
        </div>
      </div>
    </ComponentContainer>
  );
};

export default CafeStatistic;
