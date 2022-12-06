import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import { useCafe, postEditIntro } from "lib/cafe";
import { useAuth } from "lib/auth";

interface Props {
  title: string;
  info: string;
  editable?: boolean;
}

//when the component below is used, editable should be decleared properly.
const CafeIntroduction = (props: Props) => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe } = useCafe(cafe_id);
  const IntroductionBox = (props: Props) => {
    const { user } = useAuth();

    if (cafe?.is_managed === true) {
      const [editing, setEditing] = useState(false);
      const [intro, setIntro] = useState<string>("");
      const onPressSaveButton = useCallback(() => {
        if (user) {
          const introduction = intro;
          postEditIntro(cafe.id, introduction, user.token);
        }

        setEditing(false);
      }, []);
      const onPressEditButton = useCallback(() => {
        setEditing(true);
      }, []);

      if (!!!props.editable) {
        return (
          <div className="bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
            <div>{props.title}</div>
            <div className="text-2xl font-bold">{props.info}</div>
          </div>
        );
      }
      // delete and edit is only available when editable is true.
      else
        return !editing ? (
          <div className="relative bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
            <div>{props.title}</div>
            <button
              className="absolute top-0 right-0 w-20 h-10 bg-amber-800 text-white"
              onClick={onPressEditButton}
            >
              수정하기
            </button>
            <div className="text-2xl font-bold">{props.info}</div>
          </div>
        ) : (
          <div className="relative bg-slate-50 shadow-lg flex flex-col rounded-sm mr-2 place-content-evenly py-4">
            <div>{props.title}</div>
            <button
              className="absolute top-0 right-0 w-20 h-10 bg-amber-800 text-white"
              onClick={onPressSaveButton}
            >
              저장하기
            </button>
            <textarea
              name="info"
              placeholder={"please fill in"}
              defaultValue={cafe?.introduction ?? "소개를 등록해주세요"}
              onChange={(e) => setIntro(e.target.value)}
            />
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

  if (cafe?.is_managed === true)
    return (
      <div title="소개">
        <div className="bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
          <IntroductionBox
            title="우리 가게를 소개합니다"
            info={cafe?.introduction}
          />
        </div>
      </div>
    );
  else
    return (
      <div title="소개">
        <div className="bg-slate-50 py-4 shadow-lg rounded-sm h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
          <div>Cago에 등록된 카페가 아닙니다.</div>
        </div>
      </div>
    );
};

export default CafeIntroduction;
