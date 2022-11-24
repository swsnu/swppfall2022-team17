import { getCagoRequest } from "utils";
import useSWR from "swr";
import { useAuth } from "./auth";
import { AxiosError } from "axios";

interface ManagedCafe {
  id: number;
  is_managed: boolean;
  name: string;
  phone_number: string;
  address: string;
  avatar: string;
  crowdness: number;
  introduction: string;
  force_closed: boolean;
}

interface User {
  id: number;
  token: string;
}

export const getCafeList = (user: User | undefined) => {
  const { data, error } = useSWR<ManagedCafe[], AxiosError>(user && `/cafes/?manager=${user.id}`, getCagoRequest('get'), {
    shouldRetryOnError: false
  })
  return { data }
}

export const phone_numberChanger = (phone_number: string | null) => {
  return phone_number
}

export const setCafeClosed = (cafeId: number, token: string | undefined) => {
  token && getCagoRequest('patch', token)(`/cafes/${cafeId}/`, { force_closed: true })
}

export const setCafeOpened = (cafeId: number, token: string | undefined) => {
  token && getCagoRequest('patch', token)(`/cafes/${cafeId}/`, { force_closed: false })
}