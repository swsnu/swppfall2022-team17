import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dashboardData from "data/dashboard.json";

const BusinessIntroduction: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  return (
    <div className="flex flex-col justify-center h-72 mt-2">
      <div className="text-2xl font-bold border-b-2 border-black w-full mb-2 shadow">
        Business Introduction
      </div>
      <div className="border border-solid border-black rounded h-full text-center align-middle mb-2">
        Business Introduction Detail
      </div>
    </div>
  );
};

export default BusinessIntroduction;