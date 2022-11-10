import { NextComponentType } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";

const PostArticleForm: NextComponentType = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  // const redirect = (router.query.redirect as string | undefined) ?? "/";
  const redirect = `/admin/dashboard/${router.query.id}/board`;

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      // await postArticle(title, content);
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
        placeholder="제목"
        required
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        className="outlined font-normal mb-2"
      />
      <textarea
        placeholder="내용"
        required
        onChange={(e) => setContent(e.target.value)}
        className="outlined font-normal mb-2 h-[50vh]"
        autoComplete="new-password"
      />
      <button type="submit" className="contained">
        작성
      </button>
    </form>
  );
};

export default PostArticleForm;
