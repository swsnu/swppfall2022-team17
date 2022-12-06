import axios, { AxiosError } from "axios";
import { Cafe, ManagedCafe } from "components/contents/CafesMap";
import useSWR, { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";
import { useAuth } from "./auth";

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

export const setForceClosed = async (
  id: number,
  force_closed: boolean,
  token: string
) => {
  try {
    const data = await getCagoRequest("patch", token)(`/cafes/${id}/`, {
      force_closed,
    });
    await mutate(`/cafes/${id}/`, data, { revalidate: false });
  } catch (error) {
    // if (axios.isAxiosError<CagoAPIError>(error)) {
    //   if (error.response?.status === 401) {
    //     throw Error("로그인하지 않았습니다.");
    //   }
    //   if (error.response?.status === 403) {
    //     throw Error("카페의 매니저가 아닙니다.");
    //   }
    //   if (error.response?.status === 404) {
    //     throw Error("유효하지 않은 카페 ID입니다.");
    //   }
    // }
  }
};

export const useCafe = (cafeId?: string | string[]) => {
  const { user, loggedIn } = useAuth();

  // Fetch only when not logged in, or logged in and user object is set.
  const shouldFetch = (!loggedIn || (loggedIn && !!user)) && cafeId;

  const { data } = useSWR<Cafe | ManagedCafe, AxiosError>(
    shouldFetch && `/cafes/${cafeId}/`,
    getCagoRequest("get", user?.token)
  );

  return { data };
};

export const postEditIntro = async (
  cafeId: number | undefined,
  introduction: string,
  token: string
) => {
  await getCagoRequest("patch", token)("/cafes/", introduction);
  mutate(`/cafes/?cafe_id=${cafeId}`);
};
