import { useMemo } from "react";
import useSWR from "swr";
import { getCagoRequest } from "utils";

export interface Menu {
  id: number;
  cafe: number;
  name: string;
  is_main: boolean;
  category: string;
  price: number;
  image: string;
}

export interface CategorizedMenu {
  category: string;
  menuList: Menu[];
}

export const useMenu = (cafeId: string | string[] | undefined) => {
  const { data } = useSWR<Menu[]>(cafeId && `/menus/?cafe_id=${cafeId}`, getCagoRequest());

  // Get the categories.
  const categories = useMemo(() => {
    if (data) {
      const set = new Set(data.map((item) => item.category));
      return Array.from(set);
    } else {
      return [];
    }
  }, [data]);

  // Get the main menus.
  const mainMenuList = useMemo(() => {
    if (data) {
      return data.filter((item) => item.is_main);
    } else {
      return [];
    }
  }, [data]);

  // Get the list of menu formatted with the categories.
  const categorizedMenuList: CategorizedMenu[] = useMemo(() => {
    if (data && categories) {
      return categories.map((category) => {
        const menuList = data.filter((item) => item.category === category);
        return { category, menuList };
      });
    } else {
      return [];
    }
  }, [data, categories]);

  return { categories, mainMenuList, categorizedMenuList };
};
