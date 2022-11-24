import axios, { AxiosError } from "axios";
import { CagoAPIError, getCagoRequest } from "utils";
import useSWR from "swr";
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
