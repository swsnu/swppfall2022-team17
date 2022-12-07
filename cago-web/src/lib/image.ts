import { useMemo } from "react";
import useSWR from "swr";
import { getCagoRequest } from "utils";

interface CafeImage {
  id: number;
  cafe: number;
  url: string;
  is_main: boolean;
}

export const useCafeImages = (cafeId?: string | string[]) => {
  const { data } = useSWR<CafeImage[]>(cafeId && `/cafe-images/?cafe_id=${cafeId}`, getCagoRequest());

  const cafeImages = useMemo(() => {
    if (data !== undefined) {
      return data.map((d) => d.url);
    } else {
      return [];
    }
  }, [data]);

  const mainImage = useMemo(() => {
    const list = (data ?? []).filter((image) => image.is_main);
    if (list.length > 0) {
      return list[0].url;
    }
  }, [data]);

  return { cafeImages, mainImage };
};
