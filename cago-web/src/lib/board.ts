import { AxiosError } from "axios";
import useSWR, { mutate } from "swr";
import { getCagoRequest } from "../utils/index";
import { Profile } from "./profile";

export interface CafeProfile {
  id: number;
  name: string;
  avatar: string;
}

export interface Article {
  id: number;
  cafe: number;
  title: string;
  content: string;
  comments: Comment[];
  created_at: string;
  updated_at: string;
  is_updated: boolean;
}

export type Comment = CommentByCafe | CommentByCustomer;

export interface CommentByCafe {
  id: number;
  article: number;
  content: string;
  is_customer: false;
  author: CafeProfile;
  created_at: string;
  updated_at: string;
  is_updated: boolean;
}

export interface CommentByCustomer {
  id: number;
  article: number;
  content: string;
  is_customer: true;
  author: Profile;
  created_at: string;
  updated_at: string;
  is_updated: boolean;
}

export const postArticle = async (cafe_id: string, title: string, content: string, token: string) => {
  await getCagoRequest<Article>("post", token)("/board/", {
    cafe: cafe_id,
    title: title,
    content: content,
  });
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const updateArticle = async (
  cafe_id: number,
  article_id: number,
  data: { title?: string; content?: string },
  token: string
) => {
  await getCagoRequest<Article>("patch", token)(`/board/${article_id}/`, data);
  mutate(`/board/?cafe_id=${cafe_id}`);
  mutate(`/board/${article_id}/`);
};

export const deleteArticle = async (cafe_id: number, article_id: number, token: string) => {
  await getCagoRequest("delete", token)(`/board/${article_id}/`);
  mutate(`/board/?cafe_id=${cafe_id}`);
};

export const useArticles = (cafe_id: string | string[] | undefined) => {
  // Fetch cafe only when the user at admin dashboard detail page.
  const { data } = useSWR<Article[], AxiosError>(
    cafe_id && `/board/?cafe_id=${cafe_id}`,
    getCagoRequest("get")
  );

  return { articles: data ?? [] };
};

export const addComment = async (cafe_id: number, article_id: number, content: string, token: string) => {
  await getCagoRequest<Comment>("post", token)(`/comments/`, {
    article: article_id,
    content,
  });
  mutate(`/board/?cafe_id=${cafe_id}`);
  mutate(`/board/${article_id}/`);
};

export const updateComment = async (
  cafe_id: number,
  article_id: number,
  comment_id: number,
  content: string,
  token: string
) => {
  await getCagoRequest<Comment>("patch", token)(`/comments/${comment_id}/`, { content });
  mutate(`/board/?cafe_id=${cafe_id}`);
  mutate(`/board/${article_id}/`);
};

export const deleteComment = async (
  cafe_id: number,
  article_id: number,
  comment_id: number,
  token: string
) => {
  await getCagoRequest("delete", token)(`/comments/${comment_id}/`);
  mutate(`/board/?cafe_id=${cafe_id}`);
  mutate(`/board/${article_id}/`);
};
