import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import { getCagoRequest } from "utils";

export interface CafeImage {
  id: number;
  cafe: number;
  url: string;
  is_main: boolean;
}

export const postCafeImage = async (cafeId: number, image: string, token: string) => {
  const data = {
    cafe: cafeId,
    url: image,
    is_main: false,
  };
  await getCagoRequest("post", token)("/cafe-images/", data);
  await mutate(`/cafe-images/?cafe_id=${cafeId}`);
};

export const setMainImage = async (cafeId: number, imageId: number, token: string) => {
  const data = {
    is_main: true,
  };
  await getCagoRequest("patch", token)(`/cafe-images/${imageId}/`, data);
  await mutate(`/cafe-images/?cafe_id=${cafeId}`);
};

export const useCafeImages = (cafeId?: string | string[]) => {
  const { data } = useSWR<CafeImage[]>(cafeId && `/cafe-images/?cafe_id=${cafeId}`, getCagoRequest());

  const cafeImages = useMemo(() => {
    if (data !== undefined) {
      return data.map((d) => d);
    } else {
      return [];
    }
  }, [data]);

  const mainImage = useMemo(() => {
    const list = (data ?? []).filter((image) => image.is_main);
    if (list.length > 0) {
      return list[0];
    }
  }, [data]);

  return { cafeImages, mainImage };
};
