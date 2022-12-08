import { useAuth } from "lib/auth";
import { Article, deleteArticle, updateArticle } from "lib/board";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CommentsList from "./CommentsList";

interface Props {
  cafeName: string;
  cafeAvatar: string;
  article: Article;
  editable?: boolean;
}

const ArticleCard = (props: Props) => {
  const { article, editable = false, cafeName, cafeAvatar } = props;
  const { user } = useAuth();

  const [showCommentsList, setShowCommentsList] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(article.title);
  const [content, setContent] = useState<string>(article.content);

  const handleCancel = async () => {
    setTitle(article.title);
    setContent(article.content);
    setIsEditing(false);
  };

  const handleEdit = async () => {
    if (user && editable) {
      try {
        setIsEditing(false);
        await updateArticle(article.cafe, article.id, { title, content }, user.token);
      } catch (e) {
        const error = e as Error;
        window.alert(error.message);
      }
    }
  };

  const handleDelete = async () => {
    if (user && editable) {
      await deleteArticle(article.cafe, article.id, user.token);
    }
  };

  const last_updated = article.is_updated ? article.updated_at + " (수정됨)" : article.created_at;

  const articleHeader = (
    <header className="sticky top-0">
      <ul className="flex items-center p-3 shadow-sm min-h-fit">
        <li className="float-left w-1/5 text-left">
          <ul className="flex justify-start gap-2 items-center">
            <li>
              <Link href={`/cafes/${article.cafe}/info`}>
                <div className="relative w-10 h-10">
                  <Image
                    src={cafeAvatar}
                    alt="cafe-profile-avatar"
                    fill
                    className="flex rounded-full border border-slate-800 h-full"
                  />
                </div>
              </Link>
            </li>
            <li>
              <Link href={`/cafes/${article.cafe}/info`} className="text-sm font-bold leading-loose">
                {cafeName}
              </Link>
            </li>
          </ul>
        </li>
        <li className="float-left w-3/5 text-center break-all">
          {!isEditing && <div className="text-xl font-semibold">{article.title}</div>}
          {/* If editting is true, users can enter the new title. */}
          {isEditing && (
            <input
              type="text"
              aria-label="title"
              placeholder={title}
              value={title}
              required
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              className="outlined font-normal my-1 w-full"
            />
          )}
        </li>
        <li className="float-left w-1/5 text-right">
          <div className="text-sm font-normal">{last_updated}</div>
        </li>
      </ul>
    </header>
  );

  const articleContent = (
    <main>
      {!isEditing && (
        <article className="text-lg font-normal max-h-[50vh] break-all overflow-y-auto px-1 mb-1 mt-1 whitespace-pre-line shadow-sm min-h-[100px]">
          {article.content}
        </article>
      )}
      {/* If editting is true, users can enter the new content. */}
      {isEditing && (
        <textarea
          aria-label="content"
          placeholder={content}
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="outlined font-normal mb-2 min-h-[300px]"
        />
      )}
    </main>
  );

  const articleFooter = (
    <footer>
      <ul className="flex items-center h-6 py-2 px-1">
        <li className="float-left w-1/3 text-left"></li>
        <li className="float-left w-1/3 text-center">
          {/* Comments button */}
          {!showCommentsList && (
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold mb-1 py-1 px-2 rounded-sm"
              onClick={() => setShowCommentsList(true)}
            >
              댓글 보기
            </button>
          )}
          {/* If showCommentsList is true, comment button changes to close comments list button. */}
          {showCommentsList && (
            <button
              className="bg-slate-200 hover:bg-slate-300 text-xs font-bold mb-1 py-1 px-2 rounded-sm"
              onClick={() => setShowCommentsList(false)}
            >
              댓글 닫기
            </button>
          )}
        </li>
        {/* Display edit & delete button on bottom-right corner, if editable. */}
        {editable && (
          <li className="float-left w-1/3 text-right">
            {/* Edit button */}
            {!isEditing && (
              <button
                className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold mb-1 py-1 px-2 rounded-sm"
                onClick={() => setIsEditing(true)}
              >
                수정
              </button>
            )}
            {/* If editting is true, edit button changes to cancle button. */}
            {isEditing && (
              <button
                className="bg-slate-100 hover:bg-slate-200 text-xs font-bold mb-1 py-1 px-2 rounded-sm"
                onClick={() => handleCancel()}
              >
                취소
              </button>
            )}
            {/* Delete button */}
            {!isEditing && (
              <button
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold ml-0.5 mb-1 py-1 px-2 rounded-sm"
                onClick={() => handleDelete()}
              >
                삭제
              </button>
            )}
            {/* If editting is true, delete button changes to confirm edit button. */}
            {isEditing && (
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
    </footer>
  );

  return (
    <div className="flex flex-col justify-start shadow-md rounded my-3">
      {articleHeader}
      {articleContent}
      {articleFooter}
      {showCommentsList && (
        <CommentsList
          cafeId={article.cafe}
          articleId={article.id}
          comments={article.comments}
          writable={!editable}
        />
      )}
    </div>
  );
};

export default ArticleCard;
