import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { CagoAPIError, getCagoRequest } from "../utils/index";
import { Profile } from "./profile";
import { mutate } from "swr";

interface CafeProfile {
  id: number;
  name: string;
  avatar: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  cafe: CafeProfile;
  created_at: string;
  updated_at: string;
  is_updated: boolean;
  comments: Comment[];
  editable: boolean;
}

export interface Comment {
  id: number;
  article: number;
  author: Profile;
  content: string;
  created_at: string;
  updated_at: string;
  is_updated: boolean;
}

export const postArticle = async (
  cafe_id: string,
  title: string,
  content: string,
  token: string
) => {
  await getCagoRequest<Article>("post", token)("/board/", {
    cafe: cafe_id,
    title: title,
    content: content,
  });
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const editArticle = async (
  cafe_id: number,
  article_id: number,
  title: string,
  content: string,
  token: string
) => {  
  await getCagoRequest<Article>("put", token)(`/board/${article_id}/`, {
    cafe: cafe_id,
    title: title,
    content: content,
  });
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const deleteArticle = async (
  cafe_id: number,
  article_id: number,
  token: string
) => {
  await getCagoRequest("delete", token)(`/board/${article_id}/`);
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const useArticles = (cafe_id: string | string[] | undefined) => {
  // Fetch cafe only when the user at admin dashboard detail page.
  const { data, error, mutate } = useSWR<Article[], AxiosError>(
    cafe_id && `/board/?cafe_id=${cafe_id}`,
    getCagoRequest("get")
  );

  return { articles: data };
};

export const addComment = async (
  cafe_id: number,
  article_id: number,
  content: string,
  token: string
) => {
  await getCagoRequest<Comment>("post", token)(`/comments/`, {
    article: article_id,
    content,
  });
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const editComment = async (
  cafe_id: number,
  article_id: number,
  comment_id: number,
  content: string,
  token: string
) => {
  await getCagoRequest<Comment>("put", token)(`/comments/${comment_id}/`, {
    article: article_id,
    content,
  });
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const deleteComment = async (
  cafe_id: number,
  comment_id: number,
  token: string
) => {
  await getCagoRequest("delete", token)(`/comments/${comment_id}/`);
  mutate(`/board/?cafe_id=${cafe_id}`);
};
