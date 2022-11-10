import React from "react";
import Image from "next/image";
import { NextComponentType } from "next";

interface Props {
  menu: {
    id: number;
    name: string;
    price: number;
  };
}
const MenuContents = ({ menu }: Props) => {
  return (
    <div className="shrink-0 basis-48 bg-slate-100 shadow-lg m-2 round-sm">
      <div className="text-center border border-slate-400 h-3/4 ">Image Here</div>
      <div className="text-center font-bold text-lg">{menu.name}</div>
      <div className="text-center">{menu.price}</div>
    </div>
  );
};

export default MenuContents;
