import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";
import ComponentContainer from "components/contents/ComponentContainer";

const CafeIntroduction: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  return (
    <ComponentContainer title="Cafe Introduction">
      <div className=" bg-slate-50 py-4 shadow-lg rounded h-full text-center align-middle text-2xl font-medium">
        {id && dashboardData[parseInt(id) - 1].introduction}
      </div>
    </ComponentContainer>
  );
};

export default CafeIntroduction;
