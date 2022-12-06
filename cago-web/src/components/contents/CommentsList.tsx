import { useAuth } from "lib/auth";
import { addComment, Article } from "lib/board";
import { useState } from "react";
import CommentBox from "./CommentBox";

const CommentsList = (article: Article) => {
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();
  const writable = !article.editable;

  const handleAddComment = async () => {
    if (user && writable) {
      try {
        await addComment(article.cafe.id, article.id, content, user.token);
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
          <li className="float-left w-1/6 text-right pr-1 text-lg font-bold">
            새 댓글 :
          </li>
          <li className="float-left w-4/6 text-center">
            <input
              type="text"
              aria-label="content"
              placeholder="새 댓글 작성"
              value={content}
              required
              autoFocus
              onChange={(e) => setContent(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 text-black font-bold py-1 px-2 rounded text-sm font-normal my-1 w-full"
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
      {article.comments.map((comment) => (
        <CommentBox
          key={comment.id}
          id={comment.id}
          article={article.id}
          author={comment.author}
          content={comment.content}
          created_at={comment.created_at}
          updated_at={comment.updated_at}
          is_updated={comment.is_updated}
          cafe_id={article.cafe.id}
        />
      ))}
    </>
  );
};

export default CommentsList;
