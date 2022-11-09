
import { NextComponentType } from "next";
import { useRouter } from 'next/router'
import React from "react";
import dashboardData from "data/dashboard.json"


const CafeIntroductionForm: NextComponentType = () => {
    const router = useRouter()
    const id = router.query.id as string | undefined;
    return (
        <div className="flex flex-col justify-center h-96">
            <div className="border-b-2 border-black w-full mb-2">
                Cafe Introduction
            </div>
            <div className="border border-solid border-black rounded h-full text-center align-middle">
                {id && dashboardData[parseInt(id)-1].introduction}
            </div>
        </div>
    )
}


export default CafeIntroductionForm;