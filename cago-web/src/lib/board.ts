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

export const postArticle = async (cafeId: string, title: string, content: string, token: string) => {
  await getCagoRequest<Article>("post", token)("/board/", {
    cafe: cafeId,
    title: title,
    content: content,
  });
  mutate(`/board/?cafe_id=${cafeId}`);
};

export const updateArticle = async (
  cafeId: number,
  articleId: number,
  data: { title?: string; content?: string },
  token: string
) => {
  await getCagoRequest<Article>("patch", token)(`/board/${articleId}/`, data);
  mutate(`/board/?cafe_id=${cafeId}`);
  mutate(`/board/${articleId}/`);
};

export const deleteArticle = async (cafeId: number, articleId: number, token: string) => {
  await getCagoRequest("delete", token)(`/board/${articleId}/`);
  mutate(`/board/?cafe_id=${cafeId}`);
};

export const addComment = async (cafeId: number, articleId: number, content: string, token: string) => {
  await getCagoRequest<Comment>("post", token)(`/comments/`, {
    article: articleId,
    content,
  });
  mutate(`/board/?cafe_id=${cafeId}`);
  mutate(`/board/${articleId}/`);
};

export const updateComment = async (
  cafeId: number,
  articleId: number,
  commentId: number,
  content: string,
  token: string
) => {
  await getCagoRequest<Comment>("patch", token)(`/comments/${commentId}/`, { content });
  mutate(`/board/?cafe_id=${cafeId}`);
  mutate(`/board/${articleId}/`);
};

export const deleteComment = async (cafeId: number, articleId: number, commentId: number, token: string) => {
  await getCagoRequest("delete", token)(`/comments/${commentId}/`);
  mutate(`/board/?cafe_id=${cafeId}`);
  mutate(`/board/${articleId}/`);
};

export const useArticles = (cafeId?: string) => {
  // Fetch cafe only when the user at admin dashboard detail page.
  const { data } = useSWR<Article[], AxiosError>(
    cafeId && `/board/?cafe_id=${cafeId}`,
    getCagoRequest("get")
  );

  return { articles: data ?? [] };
};
