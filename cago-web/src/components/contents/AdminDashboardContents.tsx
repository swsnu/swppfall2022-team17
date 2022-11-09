import React, { useState } from "react";
import demo from "data/dashboard.json";
import { NextComponentType } from "next";

const AdminDashboardContents: NextComponentType = () => {
  const result = demo.map((item) => {
    return (
      <div
        key={item.id}
        className="flex flex-col bg-slate-100	place-content-evenly text-center w-3/5 h-24 drop-shadow mx-auto rounded-none border border-500 mb-6"
      >
        <h1 className="font-bold text-xl">
          Cafe #{item.id} : {item.name}
        </h1>
        <h2 className="text-lg italic">{item.address}</h2>
        <h2 className="text-lg">{item.phone_number}</h2>
      </div>
    );
  });
  return <div>{result}</div>;
};
export default AdminDashboardContents;
