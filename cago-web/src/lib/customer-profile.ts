import axios, { AxiosError } from "axios";
import useSWR, { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";
import { useAuth } from "./auth";

interface CustomerProfile {
  id: number;
  user: number;
  display_name: string;
  avatar: string;
}

export const defaultAvatar =
  "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png";

export const createCustomerProfile = async (
  data: { display_name: string; avatar?: string },
  token: string
) => {
  try {
    await getCagoRequest("post", token)("/customer-profiles/", data);
    mutate("/customer-profiles/me/");
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      if (error.response?.status === 401) {
        throw Error("로그인하지 않았습니다.");
      }

      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        throw Error("이미 프로필이 존재합니다.");
      }
    }
  }
};

export const useCustomerProfile = () => {
  const { user } = useAuth();

  const { data, error } = useSWR<CustomerProfile, AxiosError>(
    user ? "/customer-profiles/me/" : null,
    getCagoRequest("get", user?.token),
    { shouldRetryOnError: false }
  );

  const loading = !data && !error;

  return { loading, data };
};
