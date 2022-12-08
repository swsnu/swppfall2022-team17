import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";
import { useAuth } from "./auth";

export interface Cafe {
  id: number;
  is_managed: false;
  name: string;
  phone_number: string;
  location: string[];
  address: string;
}

export interface ManagedCafe extends Omit<Cafe, "is_managed"> {
  is_managed: true;
  avatar: string;
  crowdedness: 0 | 1 | 2 | 3;
  force_closed: boolean;
  introduction: string;
  managers: number[];
  owner: number;
  registration_number: number;
  is_liked: boolean;
  num_likes: number;
  num_reviews: number;
  num_taste: number;
  num_service: number;
  num_mood: number;
  average_rating: number;
}

export const registerCafe = async (
  data: {
    address: string;
    location: string;
    registration_number: number;
    name: string;
    phone_number: string;
  },
  token: string
) => {
  try {
    await getCagoRequest("post", token)("/cafes/", data);
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        throw Error("Cago에서 이미 관리중인 카페입니다.");
      } else {
        throw Error(errors[0].detail);
      }
    }
  }
};

export const updateCafeIntroduction = async (cafeId: number, introduction: string, token: string) => {
  await getCagoRequest("patch", token)(`/cafes/${cafeId}/`, { introduction });
  mutate(`/cafes/${cafeId}/`);
};

export const useCafe = (cafeId?: string) => {
  const { user, loggedIn } = useAuth();

  // Fetch only when not logged in, or logged in and user object is set.
  const shouldFetch = (!loggedIn || (loggedIn && !!user)) && cafeId;

  const { data: cafe } = useSWR<Cafe | ManagedCafe, AxiosError>(
    shouldFetch && `/cafes/${cafeId}/`,
    getCagoRequest("get", user?.token)
  );

  const bestStrength = useMemo(() => {
    if (cafe?.is_managed) {
      const { num_taste, num_service, num_mood } = cafe;

      // Naive comparison.
      const max = Math.max(num_taste, num_service, num_mood);
      if (max === 0) {
        return "None";
      } else if (max === num_taste) {
        return "Taste";
      } else if (max === num_service) {
        return "Service";
      } else {
        return "Mood";
      }
    }
  }, [cafe]);

  return { cafe, bestStrength };
};
