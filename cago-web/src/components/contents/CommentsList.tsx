import { useAuth } from "lib/auth";
import { addComment, Comment } from "lib/board";
import { useState } from "react";
import CommentBox from "./CommentBox";

interface Props {
  cafe_id: number;
  article_id: number;
  comments: Comment[];
  writable?: boolean;
}

const CommentsList = ({ cafe_id, article_id, comments, writable = false }: Props) => {
  const { user } = useAuth();
  const [content, setContent] = useState<string>("");

  const handleAddComment = async () => {
    if (user && writable) {
      try {
        await addComment(cafe_id, article_id, content, user.token);
        setContent("");
      } catch (e) {
        const error = e as Error;
        window.alert(error.message);
      }
    }
  };
  return (
    <>
      <hr className="border-t-slate-300" />
      {writable && (
        <ul className="flex items-center h-10 py-2 px-1 shadow-sm">
          <li className="float-left w-1/6 text-right pr-1 text-lg font-bold">새 댓글 :</li>
          <li className="float-left w-4/6 text-center">
            <input
              type="text"
              aria-label="content"
              placeholder="새 댓글 작성"
              value={content}
              required
              autoFocus
              onChange={(e) => setContent(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 text-black font-bold py-1 px-2 rounded text-sm my-1 w-full"
            />
          </li>
          <li className="float-left w-1/6 text-left">
            <button
              className="flex justify-self-start gap-2 bg-slate-900 hover:bg-slate-700 text-white text-md font-bold py-1 px-4 ml-1 rounded"
              onClick={() => handleAddComment()}
            >
              작성
            </button>
          </li>
        </ul>
      )}
      <div className="overflow-y-auto max-h-[30vh]">
        {comments.map((comment) => (
          <CommentBox key={`comment-${comment.id}`} comment={comment} cafe_id={cafe_id} />
        ))}
      </div>
    </>
  );
};

export default CommentsList;
