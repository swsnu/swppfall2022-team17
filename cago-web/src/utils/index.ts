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

/**
 * Phone number to E.164 format.
 */
export const toE164 = (phone: string) => {
  let res = phone.replaceAll("-", "");
  if (phone.startsWith("0")) {
    res = res.substring(1);
  }
  res = "+82".concat(res);
  return res;
};

/**
 * E.216 format to readable phone number.
 */
export const parseE164 = (phone: string) => {
  if (phone.length < 3) return phone;

  let res = phone.substring(3);
  res = "0".concat(res);

  if (res.length === 9) {
    res = res.substring(0, 2) + "-" + res.substring(2, 5) + "-" + res.substring(5, 9);
  } else if (res.length === 10) {
    res = res.substring(0, 2) + "-" + res.substring(2, 6) + "-" + res.substring(6, 10);
  } else if (res.length === 11) {
    res = res.substring(0, 3) + "-" + res.substring(3, 7) + "-" + res.substring(7, 11);
  }

  return res;
};

/**
 * Modified version of uuid.
 */
export const uuid = () => "xxxx-xxxx-xxxx-xxxx".replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));

export const uploadImage = async (file: File) => {
  const ext = file.name.split(".").pop();
  const fileName = `${uuid()}.${ext}`;
  const key = `/user-content/${fileName}`;

  const baseURL = process.env.NEXT_PUBLIC_S3_URL;
  const formData = new FormData();
  formData.append("files", file);

  await axios.put(key, file, { baseURL });

  return new URL(key, baseURL).href;
};
