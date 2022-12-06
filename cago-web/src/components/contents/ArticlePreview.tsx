import RequireManager from "components/layouts/RequireManager";
import { useAuth } from "lib/auth";
import { Article, deleteArticle, editArticle } from "lib/board";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CommentsList from "./CommentsList";
import { article } from "../../mocks/stubs";

const ArticlePreview = (article: Article) => {
  const [showCommentsList, setShowCommentsList] = useState<boolean>(false);
  const [editting, setEditting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(article.title);
  const [content, setContent] = useState<string>(article.content);
  const { user } = useAuth();

  const handleCancel = async () => {
    setTitle(article.title);
    setContent(article.content);
    setEditting(false);
  };

  const handleEdit = async () => {
    if (user && article.editable) {
      try {
        await editArticle(
          article.cafe.id,
          article.id,
          title,
          content,
          user.token
        );
        setEditting(false);
      } catch (e) {
        const error = e as Error;
        window.alert(error.message);
      }
    }
  };

  const handleDelete = async () => {
    if (user && article.editable) {
      await deleteArticle(article.cafe.id, article.id, user.token);
    }
  };

  const last_updated = article.is_updated
    ? article.updated_at + " (수정됨)"
    : article.created_at;
  const articleHeader = (
    <header className="sticky top-0">
      <ul className="flex items-center h-12 py-2 px-1 shadow-sm">
        <li className="float-left w-1/5 text-left">
          <ul className="flex justify-start gap-2">
            <li>
              <Link href={`/cafes/${article.cafe.id}/info`}>
                {/* TODO admin page redirects to admin/dashboard/:id */}
                <Image
                  loader={() => article.cafe.avatar}
                  src={article.cafe.avatar}
                  alt="cafe-profile-avatar"
                  width={35}
                  height={35}
                  className="flex rounded-full border border-slate-800 h-full"
                />
              </Link>
            </li>
            <li>
              <Link
                href={`/cafes/${article.cafe.id}/info`}
                className="text-sm font-bold leading-loose"
              >
                {article.cafe.name}
              </Link>
            </li>
          </ul>
        </li>
        <li className="float-left w-3/5 text-center">
          {!editting && (
            <div className="text-xl font-extrabold">{article.title}</div>
          )}
          {/* If editting is true, users can enter the new title. */}
          {editting && (
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
    <>
      {!editting && (
        <article className="text-lg font-normal max-h-[50vh] break-all overflow-y-auto px-1 mb-1 mt-1 whitespace-pre-line shadow-sm min-h-[100px]">
          {article.content}
        </article>
      )}
      {/* If editting is true, users can enter the new content. */}
      {editting && (
        <textarea
          aria-label="content"
          placeholder={content}
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="outlined font-normal mb-2 min-h-[300px]"
        />
      )}
    </>
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
        {article.editable && (
          <li className="float-left w-1/3 text-right">
            {/* Edit button */}
            {!editting && (
              <button
                className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold mb-1 py-1 px-2 rounded-sm"
                onClick={() => setEditting(true)}
              >
                수정
              </button>
            )}
            {/* If editting is true, edit button changes to cancle button. */}
            {editting && (
              <button
                className="bg-slate-100 hover:bg-slate-200 text-xs font-bold mb-1 py-1 px-2 rounded-sm"
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
    </footer>
  );

  return (
    <div className="flex flex-col justify-start shadow-md my-3">
      {articleHeader}
      {articleContent}
      {articleFooter}
      {showCommentsList && <CommentsList {...article} />}
    </div>
  );
};

export default ArticlePreview;
