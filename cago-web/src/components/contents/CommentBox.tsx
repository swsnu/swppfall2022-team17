import { useAuth } from "lib/auth";
import { Comment, deleteComment, updateComment } from "lib/board";
import { useCafe } from "lib/cafe";
import Image from "next/image";
import { useMemo, useState } from "react";

interface Props {
  comment: Comment;
  cafeId: number;
}

const CommentBox = ({ comment, cafeId }: Props) => {
  const [editting, setEditting] = useState<boolean>(false);
  const [content, setContent] = useState<string>(comment.content);
  const { user } = useAuth();
  const { cafe } = useCafe(cafeId.toString());

  const editable = useMemo(() => {
    if (!!user) {
      if (comment.is_customer) {
        return user.id === comment.author.user;
      } else if (cafe?.is_managed) {
        return user.id === cafe.owner || cafe.managers.includes(user.id);
      }
    }
    return false;
  }, [user, comment, cafe]);

  const handleCancel = async () => {
    setContent(comment.content);
    setEditting(false);
  };

  const handleEdit = async () => {
    if (!!user && editable) {
      try {
        await updateComment(cafeId, comment.article, comment.id, content, user.token);
        setEditting(false);
      } catch (e) {
        const error = e as Error;
        window.alert(error.message);
      }
    }
  };

  const handleDelete = async () => {
    if (!!user && editable) {
      await deleteComment(cafeId, comment.article, comment.id, user.token);
    }
  };

  // const last_updated = comment.is_updated ? comment.updated_at + " (수정됨)" : comment.created_at;

  return (
    <ul className="flex items-center min-h-12 max-h-24 py-2 px-1 shadow-sm">
      <li className="float-left w-1/6 text-left">
        <ul className="flex justify-end gap-2 items-center">
          <li className="relative w-8 h-8">
            <Image
              // loader={() => comment.author.avatar}
              src={comment.author.avatar}
              alt="comment-author-profile-avatar"
              fill
              className="flex rounded-full border border-slate-800 h-full"
            />
          </li>
          <li className="text-sm font-bold leading-loose pr-2">
            {comment.is_customer ? comment.author?.display_name : comment.author.name}
          </li>
        </ul>
      </li>
      <li className="float-left w-4/6 text-left">
        {!editting && (
          <div className="text-lg font-normal leading-tight px-2 py-1 overflow-y-auto max-h-24 break-all">
            {comment.content}
          </div>
        )}
        {/* If editting is true, users can enter the new content. */}
        {editting && (
          <input
            type="text"
            aria-label="content"
            placeholder={content}
            value={content}
            required
            autoFocus
            onChange={(e) => setContent(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 text-black font-bold py-1 px-2 rounded text-sm my-1 w-full"
          />
        )}
      </li>
      {/* Display edit & delete button on right side, if editable. */}
      {editable && (
        <li className="float-left w-1/6 text-left">
          {/* Edit button */}
          {!editting && (
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold ml-1 mb-1 py-1 px-2 rounded-sm"
              onClick={() => setEditting(true)}
            >
              수정
            </button>
          )}
          {/* If editting is true, edit button changes to cancle button. */}
          {editting && (
            <button
              className="bg-slate-100 hover:bg-slate-200 text-xs font-bold ml-1 mb-1 py-1 px-2 rounded-sm"
              onClick={() => handleCancel()}
            >
              취소
            </button>
          )}
          {/* Delete button */}
          {!editting && (
            <button
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold ml-0.5 mb-1 py-1 px-2 rounded-sm"
              onClick={() => handleDelete()}
            >
              삭제
            </button>
          )}
          {/* If editting is true, delete button changes to confirm edit button. */}
          {editting && (
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold ml-0.5 mb-1 py-1 px-2 rounded-sm"
              onClick={() => handleEdit()}
            >
              확인
            </button>
          )}
        </li>
      )}
    </ul>
  );
};

export default CommentBox;
