import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { NextPageWithLayout } from "pages/_app";
import Router, { useRouter } from "next/router";
import { getCafeDetail } from "lib/dashboard";
import Link from "next/link";

const ManagedCafeMain: NextPageWithLayout = () => {
    const router = useRouter()
    const { cafe_id } = router.query
    const { data } = getCafeDetail(cafe_id)
    console.log(data)
    return (
        <main className="p-4">
            {data &&
                <div className="min-h-fit grid grid-rows-3 grid-cols-2 grid-flow-col gap-4">
                    {cafeInfoBox("카페 사진", "Todo: pictures", `/admin/dashboard/${cafe_id}/add-pictures`,"2")}
                    {cafeInfoBox("게시판", "Todo: border", `/admin/dashboard/${cafe_id}/board`)}
                    {cafeInfoBox("간단 소개글", data.introduction, `/admin/dashboard/${cafe_id}/info`)}
                    {cafeInfoBox("리뷰", "Todo: Reviews", `/admin/dashboard/${cafe_id}/reviews`)}
                    {cafeInfoBox("메뉴", "Todo: Menu", `/admin/dashboard/${cafe_id}/menu`)}
                </div>
            }
        </main>)
}

const cafeInfoBox = (title: string, contents: string, redirectURL: string, rowSpan:string = "1") => {
    const router = useRouter()
    router.prefetch(redirectURL)
    return (
        <div className={`outlined font-extrabold w-full h-full row-span-${rowSpan}`}>
            <div className="w-full h-full flex flex-col">
                <div className="flex justify-between">
                    {title}
                    <Link href={redirectURL} className="border border-black aspect-square h-[4em] py-[1em] text-center text-xs rounded-full focus:ring-4 focus:ring-slate-400 hover:ring-4 hover:ring-slate-400 hover:bg-slate-300">
                        More
                    </Link>
                </div>
                <div className="w-full h-full border border-black shadow border-2 rounded-lg my-2 text-center p-4">
                    {contents}
                </div>
            </div>
        </div>
    )
}

ManagedCafeMain.getLayout = (page) => (
    <RequireLogin>
        <CagoAdminHeader />
        <Container>{page}</Container>
    </RequireLogin>
);

export default ManagedCafeMain;