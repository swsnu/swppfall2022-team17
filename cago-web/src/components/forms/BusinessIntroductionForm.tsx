import { NextComponentType } from "next";
import { useRouter } from 'next/router'
import React from "react";
import dashboardData from "data/dashboard.json";



const BusinessIntroductionFormForm: NextComponentType = () => {
    const router = useRouter()
    const id = router.query.id as string | undefined;
    return (
        <div className="flex flex-col justify-center h-96 mt-2">
            <div className="border-b-2 border-black w-full mb-2">
                Business Introduction
            </div>
            <div className="border border-solid border-black rounded h-full text-center align-middle">
                Business Introduction Detail
            </div>
        </div>
    )
}


export default BusinessIntroductionFormForm;