import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import ContentSection from "components/contents/ContentSection";
import { getCagoRequest } from "utils";
import { useAuth } from "lib/auth";
import { AxiosError } from "axios";
import useSWR from "swr";
import { useCallback } from "react";

interface Props {
  title: string;
  info: string | undefined;
}

interface Introduction {
  id: number;
  introduction: string;
}

const CafeIntroduction: NextComponentType = () => {
  const router = useRouter();
  const { user } = useAuth();
  const isAdminPage = router.pathname.slice(0, 10).includes("admin");

  // Fetch profile only when the user object is available.
  const { data: introductionData } = useSWR<Introduction, AxiosError>(
    user && `/cafes/${router.query.id}/info`,
    getCagoRequest("get", user?.token),
    { shouldRetryOnError: false }
  );

  const ref = useRef(null);
  const [editing, setEditing] = useState(false);

  const onPressEditButton = useCallback(() => {
    setEditing(true);
  }, []);

  const onPressSaveButton = useCallback(() => {
    console.log("ref", ref.current ? ref.current["value"] : "");
    setEditing(false);
  }, []);

  const IntroductionBox = ({ title, info }: Props) => {
    if (!isAdminPage) {
      return (
        <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
          <div>{title}</div>
          <div className="text-2xl font-bold">{info}</div>
        </div>
      );
    }

    return !editing ? (
      <div className="relative bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
        <div>{title}</div>
        <button
          className="absolute top-0 right-0 w-20 h-10 bg-amber-800 text-white"
          onClick={onPressEditButton}
        >
          수정하기
        </button>
        <div className="text-2xl font-bold">{info}</div>
      </div>
    ) : (
      <div className="relative bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
        <div>{title}</div>
        <button
          className="absolute top-0 right-0 w-20 h-10 bg-amber-800 text-white"
          onClick={onPressSaveButton}
        >
          저장하기
        </button>
        <textarea
          ref={ref}
          name="info"
          placeholder={"please fill in"}
          defaultValue={introductionData?.introduction ?? ""}
        />
      </div>
    );
  };

  return (
    <ContentSection title="소개">
      <div className="bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
        <IntroductionBox
          title="우리 가게를 소개합니다"
          info={introductionData?.introduction}
        />
      </div>
    </ContentSection>
  );
};

export default CafeIntroduction;
