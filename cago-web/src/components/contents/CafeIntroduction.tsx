
import { NextComponentType } from "next";
import { useRouter } from 'next/router'
import React from "react";
import dashboardData from "data/dashboard.json";


const CafeIntroduction: NextComponentType = () => {
    const router = useRouter()
    const id = router.query.id as string | undefined;
    return (
        <div className="flex flex-col justify-center h-48 mt-2">
            <div className="text-2xl font-bold w-full mb-4">
                Cafe Introduction
            </div>
            <div className="bg-slate-50 py-4 shadow-lg rounded h-full text-center align-middle mb-2 text-2xl font-medium">
                {id && dashboardData[parseInt(id)-1].introduction}
            </div>
        </div>
    )
}


export default CafeIntroduction;