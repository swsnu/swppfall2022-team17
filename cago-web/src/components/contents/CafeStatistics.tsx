import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useSWR from "swr";
import { getCagoRequest } from "utils";

interface Props {
  title: string;
  info: string | number | undefined;
}

interface Statistics {
  id: number;
  strength:
    | "for studying"
    | "good drink"
    | "good dessert"
    | "good mood"
    | "good service"
    | "photo zone"
    | "for chat"
    | "reasonable price";
  num_reviews: number;
  num_likes: number;
}

const CafeStatistics: NextComponentType = () => {
  const router = useRouter();
  const { cafe_id } = router.query;

  const { data: statisticData } = useSWR<Statistics, AxiosError>(
    cafe_id && `/cafes/${cafe_id}/`,
    getCagoRequest()
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
    <div title="리뷰">
      <div className="flex h-full text-center align-middle place mb-2">
        <StatisticBox title="대표 장점" info={statisticData?.strength} />
        <StatisticBox title="리뷰 수" info={statisticData?.num_reviews} />
        <StatisticBox title="좋아요 수" info={statisticData?.num_likes} />
      </div>
    </div>
  );
};

export default CafeStatistics;
