import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentSection from "components/contents/ContentSection";
import { AxiosError } from "axios";
import useSWR from "swr";
import { getCagoRequest } from "utils";
import { useAuth } from "lib/auth";

interface Props {
  title: string;
  info: string | number | undefined;
}

interface Statistics {
  id: number;
  contents: string;
  reviews_num: number;
  likes: number;
}

const CafeStatistic: NextComponentType = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Fetch profile only when the user object is available.
  const { data: statisticData } = useSWR<Statistics, AxiosError>(
    user && `/cafes/${router.query.id}/info`,
    getCagoRequest("get", user?.token),
    { shouldRetryOnError: false }
  );

  const StatisticBox = ({ title, info }: Props) => {
    return (
      <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm w-2/6 mr-2 place-content-evenly py-4">
        <div>{title}</div>
        <div className="text-2xl font-bold">{info}</div>
      </div>
    );
  };

  return (
    <ContentSection title="리뷰">
      <div className="flex h-full text-center align-middle place mb-2">
        <StatisticBox title="대표 장점" info={statisticData?.contents} />
        <StatisticBox title="리뷰 수" info={statisticData?.reviews_num} />
        <StatisticBox title="좋아요 수" info={statisticData?.likes} />
      </div>
    </ContentSection>
  );
};

export default CafeStatistic;
