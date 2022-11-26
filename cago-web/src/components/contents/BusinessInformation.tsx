import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentSection from "components/contents/ContentSection";
import { AxiosError } from "axios";
import useSWR from "swr";
import { getCagoRequest } from "utils";
import { useAuth } from "lib/auth";

interface Props {
  index: number;
  title: string;
  info: string | undefined;
}

interface BusinessInformation {
  id: number | undefined;
  name: string | undefined;
  open_hour: string | undefined;
  off_day: string | undefined;
  phone_number: string | undefined;
  address: string | undefined;
  representative_name: string | undefined;
  representative_number: string | undefined;
}

const BusinessInformation: NextComponentType = () => {
  const router = useRouter();
  const { user } = useAuth();
  const isAdminPage = router.pathname.slice(0, 10).includes("admin");

  const { data: bizinfoData } = useSWR<BusinessInformation, AxiosError>(
    user && `/cafes/${router.query.id}/info`,
    getCagoRequest("get", user?.token),
    { shouldRetryOnError: false }
  );

  const ref = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [editing, setEditing] = useState(false);

  const onPressEditButton = useCallback(() => {
    setEditing(true);
  }, []);

  const onPressSaveButton = useCallback(() => {
    console.log("ref", ref[0].current?.["value"]);
    console.log("ref", ref[1].current?.["value"]);
    console.log("ref", ref[2].current?.["value"]);
    console.log("ref", ref[3].current?.["value"]);
    console.log("ref", ref[4].current?.["value"]);
    console.log("ref", ref[5].current?.["value"]);
    console.log("ref", ref[6].current?.["value"]);
    setEditing(false);
  }, []);

  const InformationBox = ({ index, title, info }: Props) => {
    if (!isAdminPage) {
      return (
        <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
          <div>{title}</div>
          <div className="text-2xl font-bold">{info}</div>
        </div>
      );
    }

    const indexRef = ref[index];

    return (
      <div className="bg-slate-50 shadow-lg rounded-sm float-left mr-2 place-content-evenly py-4">
        <div>{title}</div>
        {!editing ? (
          <div className="text-2xl font-bold">{info}</div>
        ) : (
          <textarea
            ref={indexRef}
            name="business"
            // name=`business-${index}`
            placeholder={"please fill in"}
            defaultValue={bizinfoData?.name ?? ""}
          />
        )}
      </div>
    );
  };

  if (!isAdminPage) {
    return (
      <ContentSection title="사업장 정보">
        <div className="bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
          <InformationBox index={0} title="카페 명" info={bizinfoData?.name} />
          <InformationBox
            index={1}
            title="오픈 시간"
            info={bizinfoData?.open_hour}
          />
          <InformationBox
            index={2}
            title="쉬는 날"
            info={bizinfoData?.off_day}
          />
          <InformationBox
            index={3}
            title="전화번호"
            info={bizinfoData?.phone_number}
          />
          <InformationBox index={4} title="주소" info={bizinfoData?.address} />
          <InformationBox
            index={5}
            title="대표자 명"
            info={bizinfoData?.representative_name}
          />
          <InformationBox
            index={6}
            title="사업자 등록 번호"
            info={bizinfoData?.representative_number}
          />
        </div>
      </ContentSection>
    );
  }

  return (
    <ContentSection title="사업장 정보">
      <div className="relative bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
        {!editing ? (
          <button
            className="absolute top-0 right-0 w-20 h-10 bg-amber-800 text-white"
            onClick={onPressEditButton}
          >
            수정하기
          </button>
        ) : (
          <button
            className="absolute top-0 right-0 w-20 h-10 bg-amber-800 text-white"
            onClick={onPressSaveButton}
          >
            저장하기
          </button>
        )}
        <InformationBox index={0} title="카페 명" info={bizinfoData?.name} />
        <InformationBox
          index={1}
          title="오픈 시간"
          info={bizinfoData?.open_hour}
        />
        <InformationBox index={2} title="쉬는 날" info={bizinfoData?.off_day} />
        <InformationBox
          index={3}
          title="전화번호"
          info={bizinfoData?.phone_number}
        />
        <InformationBox index={4} title="주소" info={bizinfoData?.address} />
        <InformationBox
          index={5}
          title="대표자 명"
          info={bizinfoData?.representative_name}
        />
        <InformationBox
          index={6}
          title="사업자 등록 번호"
          info={bizinfoData?.representative_number}
        />
      </div>
    </ContentSection>
  );
};

export default BusinessInformation;
