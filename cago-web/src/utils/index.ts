import axios from "axios";

export interface CagoAPIError {
  type: string;
  errors: {
    code: string;
    detail: string;
    attr: string;
  }[];
}

/**
 * Make a Cago API error response.
 */
export const getCagoAPIError = (code?: string): CagoAPIError => ({
  type: "client_error",
  errors: [{ code: code ?? "code", detail: "detail", attr: "attr" }],
});

/**
 * Get a method to call Cago API.
 */
export const getCagoRequest = <T>(method = "get", token: string | null = null) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CAGO_API_URL,
    headers: {
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
    withCredentials: true,
  });

  return (url: string, data = {}) => axiosInstance<T>({ method, url, data }).then((res) => res.data);
};
