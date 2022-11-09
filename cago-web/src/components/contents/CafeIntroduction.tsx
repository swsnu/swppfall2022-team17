
import { NextComponentType } from "next";
import { useRouter } from 'next/router'
import React from "react";
import dashboardData from "data/dashboard.json";


const CafeIntroduction: NextComponentType = () => {
    const router = useRouter()
    const id = router.query.id as string | undefined;
    return (
        <div className="flex flex-col justify-center h-48 mt-2">
            <div className="text-2xl font-bold border-b-2 border-black w-full mb-2 shadow">
                Cafe Introduction
            </div>
            <div className="border border-solid border-black rounded h-full text-center align-middle mb-2">
                {id && dashboardData[parseInt(id)-1].introduction}
            </div>
        </div>
    )
}


export default CafeIntroduction;