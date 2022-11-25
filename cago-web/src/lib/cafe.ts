import axios from "axios";
import { CagoAPIError, getCagoRequest } from "utils";

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
