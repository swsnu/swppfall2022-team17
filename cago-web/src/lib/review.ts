import axios, { AxiosError } from "axios";
import useSWR, { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";
import { Profile } from "./profile";

export interface Review {
  id: number;
  cafe: number;
  author: Profile;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  strength: string;
  created_at: string;
}

export const createReview = async (
  cafe_id: number,
  content: string,
  rating: 1 | 2 | 3 | 4 | 5,
  strength: string,
  token: string
) => {
  try {
    await getCagoRequest<Review>("post", token)("/reviews/", {
      cafe: cafe_id,
      content: content,
      rating: rating,
      strength: strength,
    });
    mutate(`/reviews/?cafe_id=${cafe_id}`);
    mutate(`/cafes/${cafe_id}/`);
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        throw Error("해당 카페에 이미 리뷰를 작성했습니다.");
      }

      if (error.response?.status === 403) {
        throw Error("해당 카페의 매니저는 리뷰를 작성할 수 없습니다.");
      }
    }
  }
};

export const deleteReview = async (cafe_id: number, review_id: number, token: string) => {
  await getCagoRequest("delete", token)(`/reviews/${review_id}/`);
  mutate(`/reviews/?cafe_id=${cafe_id}`);
  mutate(`/cafes/${cafe_id}/`);
};

export const useReviews = (cafe_id: string | string[] | undefined) => {
  // Get the list of reviews
  const { data } = useSWR<Review[], AxiosError>(
    cafe_id && `/reviews/?cafe_id=${cafe_id}`,
    getCagoRequest("get")
  );

  return { reviews: data ?? [] };
};
