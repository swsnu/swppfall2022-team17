import axios from "axios";
import { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";

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

export const setForceClosed = async (id: number, force_closed: boolean, token: string) => {
  try {
    const data = await getCagoRequest("patch", token)(`/cafes/${id}/`, { force_closed });
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
