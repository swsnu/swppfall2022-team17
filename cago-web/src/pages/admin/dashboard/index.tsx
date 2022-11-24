import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";
import { getCafeList, phone_numberChanger, setCafeClosed } from "lib/dashboard";

const Dashboard: NextPageWithLayout = () => {
  const { data } = getCafeList();
  return (
    <main>
      <div className="my-4 m-auto border border-black flex flex-col max-h-screen overflow-auto">
        {data &&
          data.map((cafeData) => (
            <button className="m-2 p-2 border border-black rounded-lg shadow bg-slate-100 flex justify-center focus:bg-slate-300 transition hover:ring-2 hover:ring-black hover:bg-slate-300">
              <div className="flex items-center w-2/3 min-w-fit justify-around">
                <img src={cafeData.avatar} className="w-2/12" />
                <div key={`managed cafe ${cafeData.id} container`} className="flex flex-col w-1/2 min-w-fit max-w-sm">
                  {cafeInfo("카페 명", cafeData.name)}
                  {cafeInfo("주소", cafeData.address)}
                  {cafeInfo("전화번호", cafeData.phone_number)}
                </div>
              </div>
            </button>
          ))}
      </div>
      <Link href="/admin/register-cafe" className="outlined">
        카페 등록하기
      </Link>
      <div className="h-screen" />
    </main>
  );
};

const cafeInfo = (title: string, info: string) => {
  return (
    <div className="m-1 text-left flex justify-between w-full">
      {title} <div >{info}</div>
    </div>)
}

Dashboard.getLayout = (page) => (
  <RequireLogin>
    <CagoAdminHeader />
    <Container>{page}</Container>
  </RequireLogin>
);

export default Dashboard;
