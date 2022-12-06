import { AxiosError } from "axios";
import useSWR, { mutate } from "swr";
import { getCagoRequest } from "utils";
import { Profile } from "./profile";

export interface Review {
  id: number;
  cafe: number;
  author: Profile;
  content: string;
  rating: number;
  strength: string;
  created_at: string;
}

export const postReview = async (
  cafe_id: string,
  content: string,
  rating: number,
  strength: string,
  token: string
) => {
  await getCagoRequest<Review>("post", token)("/reviews/", {
    cafe: cafe_id,
    content: content,
    rating: rating,
    strength: strength,
  });
  mutate(`/reviews/?cafe_id=${cafe_id}`);
};

export const deleteReview = async (
  cafe_id: number,
  review_id: number,
  token: string
) => {
  await getCagoRequest("delete", token)(`/reviews/${review_id}/`);
  mutate(`/reviews/?cafe_id=${cafe_id}`);
};

export const useReviews = (cafe_id: string | string[] | undefined) => {
  // Get the list of reviews
  const { data } = useSWR<Review[], AxiosError>(
    cafe_id && `/reviews/?cafe_id=${cafe_id}`,
    getCagoRequest("get")
  );

  return { reviews: data };
};

