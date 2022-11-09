import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";
import ContentSection from "components/contents/ContentSection";

const CafeStatistic: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  interface Props {
    dataName: string;
    data: number | string | undefined;
  }

  const StatisticBox = ({dataName,data}:Props) => {
    return (
      <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm w-2/6 mr-2 place-content-evenly py-4">
        <div>{dataName}</div>
        <div className="text-2xl font-bold">{data}</div>
      </div>
    );
  };
  
  return (
    <ContentSection title="통계">
      <div className="flex h-full text-center align-middle place mb-2">
        <StatisticBox dataName="장점" data={id && dashboardData[parseInt(id) - 1].best}/>
        <StatisticBox dataName="리뷰" data={id && dashboardData[parseInt(id) - 1].reviews}/>
        <StatisticBox dataName="좋아요" data={id && dashboardData[parseInt(id) - 1].likes}/>
      </div>
    </ContentSection>
  );
};

export default CafeStatistic;
