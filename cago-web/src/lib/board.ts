import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { CagoAPIError, getCagoRequest } from "../utils/index";

interface CafeProfile {
  id: number;
  name: string;
  avatar: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  author: CafeProfile;
  // created_at: string;
}

export const postArticle = async (
  cafe_id: string,
  title: string,
  content: string,
  token: string
) => {
  try {
    await getCagoRequest<Article>("post", token)("/board/", {
      cafe_id,
      title,
      content,
    });
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (axios.isAxiosError<CagoAPIError>(error)) {
        if (error.response?.status === 401) {
          throw Error("로그인하지 않았습니다.");
        }
        if (error.response?.status === 403) {
          throw Error("카페의 매니저가 아닙니다.");
        }
        if (error.response?.status === 404) {
          throw Error("유효하지 않은 카페 ID입니다.");
        }
      }
    }
  }
};

export const useArticles = () => {
  const router = useRouter();
  const cafe_id = router.query.cafe_id;
  const detail = cafe_id !== undefined;

  // Fetch cafe only when the user at admin dashboard detail page.
  const { data, error, mutate } = useSWR<Article[], AxiosError>(
    detail && `/board/?${cafe_id}`,
    getCagoRequest("get"),
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (!detail) {
      // Set data to undefined if user is not at the detail page.
      mutate(undefined, { revalidate: false });
    }
  }, [detail, mutate]);

  return { articles: data };
};