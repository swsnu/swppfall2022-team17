import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dashboardData from "data/dashboard.json";
import ContentSection from "components/contents/ContentSection";

const BusinessInformation: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  interface Props {
    dataName: string;
    data: string | undefined;
  }

  const InformationBox = ({ dataName, data }: Props) => {
    return (
      <div className="flex place-content-around text-xl">
        <div className="w-1/3 text-right">{dataName}</div>
        <div className="w-2/4 text-left break-all">{data}</div>
      </div>
    );
  };

  return (
    <ContentSection title="사업장 정보">
      <div className="bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
        <InformationBox
          dataName="카페 명 :"
          data={id && dashboardData[parseInt(id) - 1].name}
        />
        <InformationBox
          dataName="오픈 시간 :"
          data={id && dashboardData[parseInt(id) - 1].business_hour}
        />
        <InformationBox
          dataName="쉬는 날 :"
          data={id && dashboardData[parseInt(id) - 1].day_off}
        />
        <InformationBox
          dataName="전화번호 :"
          data={id && dashboardData[parseInt(id) - 1].phone}
        />
        <InformationBox
          dataName="주소 :"
          data={id && dashboardData[parseInt(id) - 1].address}
        />
        <InformationBox
          dataName="대표자 명 :"
          data={id && dashboardData[parseInt(id) - 1].name_of_representative}
        />
        <InformationBox
          dataName="사업자 등록 번호 :"
          data={
            id && dashboardData[parseInt(id) - 1].business_registration_number
          }
        />
      </div>
    </ContentSection>
  );
};

export default BusinessInformation;
