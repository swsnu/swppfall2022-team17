import { NextComponentType } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { postArticle } from "lib/board";
import { useAuth } from "lib/auth";

const PostArticleForm: NextComponentType = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const cafe_id = router.query.cafe_id

  const redirect = `/admin/dashboard/${cafe_id}/board`;

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      if (user && typeof cafe_id === "string") await postArticle(cafe_id, title, content, user.token);
      router.replace(redirect);
    } catch (e) {
      const error = e as Error;
      window.alert(error.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        aria-label="title"
        placeholder="제목"
        required
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        className="outlined font-normal mb-2"
      />
      <textarea
        placeholder="내용"
        aria-label="content"
        required
        onChange={(e) => setContent(e.target.value)}
        className="outlined font-normal mb-2 h-[50vh]"
      />
      <button type="submit" className="contained">
        작성
      </button>
    </form>
  );
};

export default PostArticleForm;