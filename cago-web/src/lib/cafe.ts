import axios, { AxiosError } from "axios";
import { CagoAPIError, getCagoRequest } from "utils";
import useSWR, { mutate } from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";

export interface Cafe {
  id: number;
  name: string;
  force_closed: boolean;
}

export const registerCafe = async (
  registrationNumber: string,
  businessName: string,
  representativeName: string,
  address: string,
  phoneNumber: string
) => {
  try {
    await getCagoRequest<{
      id: number;
      registration_number: string;
      business_name: string;
      representative_name: string;
      address: string;
      phone_number: string;
    }>("post")("/cafes/", {
      registration_number: registrationNumber,
      business_name: businessName,
      representative_name: representativeName,
      address,
      phone_number: phoneNumber,
    });
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        throw Error("이미 등록된 카페입니다.");
      }
    }
  }
};

export const toggleOpen = async (
  id: number,
  force_closed: boolean,
  token: string
) => {
  try {
    const data = await getCagoRequest("patch", token)(`/cafes/${id}/`, {
      force_closed: force_closed,
    });
    await mutate(`/cafes/${id}`, data, { revalidate: false });
  } catch (error) {
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
};

export const useCafe = (admin: boolean) => {
  const router = useRouter();
  const path = router.pathname.split("/");
  const detail = path.length > 3;
  const cafeID = detail ? path[admin ? 3 : 2] : -1;
  
  // Fetch cafe only when the user at admin dashboard detail page.
  const { data, error, mutate } = useSWR<Cafe, AxiosError>(
    detail && `/cafes/${cafeID}/`,
    getCagoRequest("get"),
    { shouldRetryOnError: false }
  );

  const cafeSelected = !!data && !error;

  useEffect(() => {
    if (!detail) {
      // Set data to undefined if user is not at the detail page.
      mutate(undefined, { revalidate: false });
    }
  }, [detail, mutate]);

  return { cafeSelected, cafe: data };
};
