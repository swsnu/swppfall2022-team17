import axios from "axios";
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
