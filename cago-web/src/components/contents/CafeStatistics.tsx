import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";
import ComponentContainer from "components/contents/ComponentContainer";

const CafeStatistic: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  interface Props {
    dataName: string;
    data: number | string | undefined;
  }

  const StatisticBox = ({dataName,data}:Props) => {
    return (
      <div className="bg-slate-50 shadow-lg flex flex-col rounded w-2/6 mr-2 place-content-evenly py-4">
        <div className="text-3xl">{dataName}</div>
        <div>{data}</div>
      </div>
    );
  };
  
  return (
    <ComponentContainer title="Cafe Statistics">
      <div className="flex h-full text-center align-middle place mb-2">
        <StatisticBox dataName="Best" data={id && dashboardData[parseInt(id) - 1].best}/>
        <StatisticBox dataName="Reviews" data={id && dashboardData[parseInt(id) - 1].reviews}/>
        <StatisticBox dataName="Likes" data={id && dashboardData[parseInt(id) - 1].likes}/>
      </div>
    </ComponentContainer>
  );
};

export default CafeStatistic;
