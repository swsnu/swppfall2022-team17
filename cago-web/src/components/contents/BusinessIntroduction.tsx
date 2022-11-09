import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dashboardData from "data/dashboard.json";

const BusinessIntroduction: NextComponentType = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  
  interface Props {
    dataName : string,
    data : string | undefined
  }

  const InformationBox = ({dataName, data}:Props)=>{
    return(
      <div className="flex place-content-around text-xl">
          <div className="w-1/3 text-right">{dataName}</div>
          <div className="w-2/4 text-left">{data}</div>
        </div>
    )
  }

  return (
    <div className="flex flex-col justify-center h-72 mt-2">
      <div className="text-2xl font-bold w-full mb-4 ">
        Business Introduction
      </div>
      <div className="bg-slate-50 py-4 shadow-lg rounded h-full text-center align-middle mb-2 flex flex-col place-content-evenly">
        <InformationBox dataName = "Cafe name :" data = {id && dashboardData[parseInt(id) - 1].name}/>
        <InformationBox dataName = "Business hour :" data = {id && dashboardData[parseInt(id) - 1].business_hour}/>
        <InformationBox dataName = "Day-off :" data = {id && dashboardData[parseInt(id) - 1].day_off}/>
        <InformationBox dataName = "Phone number :" data = {id && dashboardData[parseInt(id) - 1].phone_number}/>
        <InformationBox dataName = "Address :" data = {id && dashboardData[parseInt(id) - 1].address}/>
        <InformationBox dataName = "Name of representative:" data = {id && dashboardData[parseInt(id) - 1].name_of_representative}/>
        <InformationBox dataName = "Business registration number :" data = {id && dashboardData[parseInt(id) - 1].business_registration_number}/>
      </div>
    </div>
  );
};

export default BusinessIntroduction;
