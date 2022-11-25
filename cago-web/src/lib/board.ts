import axios from "axios";
import { CagoAPIError, getCagoRequest } from "../utils/index";

interface CafeProfile {
  id: number;
  display_name: string;
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
    await getCagoRequest<Article>("post", token)(`/board/?${cafe_id}`, {
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
