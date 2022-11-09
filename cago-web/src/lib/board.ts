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

export const postArticle = async (title: string, content: string) => {
  // try {
  //   await getCagoRequest<Article>("post")("/board/", {
  //     title,
  //     content,
  //   });
  // } catch (error) {
  //   if (axios.isAxiosError<CagoAPIError>(error)) {
  //     const { errors } = error.response?.data!;
  //     if (errors.some((v) => v.code === "unique")) {
  //       throw Error("중복된 이메일입니다.");
  //     }
  //   }
  // }
};
