import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React from "react";
import dashboardData from "data/dashboard.json";
import ContentSection from "components/contents/ContentSection";

const CafeIntroduction: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  return (
    <ContentSection title="한 줄 소개">
      <div className=" bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle text-2xl font-medium">
        {id && dashboardData[parseInt(id) - 1].introduction}
      </div>
    </ContentSection>
  );
};

export default CafeIntroduction;
