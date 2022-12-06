import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useCafe } from "lib/cafe";

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

  const { data: cafe } = useCafe(cafe_id);

  const StatisticBox = ({ title, info }: Props) => {
    if (cafe?.is_managed === true) {
      return (
        <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm w-2/6 mr-2 place-content-evenly py-4">
          <div>{title}</div>
          <div className="text-2xl font-bold">{info}</div>
        </div>
      );
    } else
      return (
        <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
          <div className="text-2xl font-bold">
            Cago에 등록된 카페가 아닙니다.
          </div>
        </div>
      );
  };

  if (cafe?.is_managed === true) {
    return (
      <div title="리뷰">
        <div className="flex h-full text-center align-middle place mb-2">
          <StatisticBox title="대표 장점" info={cafe?.strength} />
          <StatisticBox title="리뷰 수" info={cafe?.num_reviews} />
          <StatisticBox title="좋아요 수" info={cafe?.num_likes} />
        </div>
      </div>
    );
  } else
    return (
      <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
        <div className="text-2xl font-bold">Cago에 등록된 카페가 아닙니다.</div>
      </div>
    );
};

export default CafeStatistics;
