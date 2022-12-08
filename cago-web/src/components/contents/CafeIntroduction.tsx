import { useAuth } from "lib/auth";
import { updateCafeIntroduction } from "lib/cafe";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface ReadOnlyProps {
  introduction: string;
  editable?: false;
}

interface EditableProps extends Omit<ReadOnlyProps, "editable"> {
  editable: true;
  cafeId: number;
}

const CafeIntroduction = (props: ReadOnlyProps | EditableProps) => {
  const { introduction, editable } = props;
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIntroduction, setEditingIntroduction] = useState<string>("");

  const handleIntroductionSave = async () => {
    if (editable && user) {
      setIsEditing(false);
      await updateCafeIntroduction(props.cafeId, editingIntroduction, user.token);
    }
  };

  return (
    <article className="relative p-4 rounded shadow-lg bg-gray-50">
      <h3 className="text-center font-semibold text-lg mb-4">카페 소개</h3>

      {(!editable || !isEditing) && <p className="text-justify p-2">{introduction}</p>}

      {editable && !isEditing && (
        <button
          aria-label="edit"
          className="absolute rounded-tr top-0 right-0 p-2 text-black"
          onClick={(e) => {
            setEditingIntroduction(introduction);
            setIsEditing(true);
          }}
        >
          <FaPencilAlt />
        </button>
      )}

      {editable && isEditing && (
        <>
          <textarea
            value={editingIntroduction}
            onChange={(e) => setEditingIntroduction(e.target.value)}
            className="w-full mb-4 block rounded resize-none p-2"
            rows={5}
          />
          <button className="contained w-full" onClick={(e) => handleIntroductionSave()}>
            저장하기
          </button>
        </>
      )}
    </article>
  );
};

export default CafeIntroduction;
