import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";
import { getCafeList, phone_numberChanger, setCafeClosed, setCafeOpened } from "lib/dashboard";
import { useAuth } from "lib/auth";
import { useRouter } from "next/router";

const Dashboard: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { data } = getCafeList(user);
  const router = useRouter();

  return (
    <main className="flex flex-col justify-center h-1/2 p-4">
      <div className="w-full m-auto border border-black flex flex-col max-h-screen overflow-auto">
        {data &&
          data.map((cafeData) => (
            <div key={`managed cafe ${cafeData.id} container`} className="outlined m-2 p-2 rounded-lg shadow bg-slate-100 flex items-center justify-center focus:bg-slate-300 transition-all hover:ring-2 hover:ring-black hover:bg-slate-300">
              <Link href={`/admin/dashboard/${cafeData.id}`} className="w-2/3 flex justify-center">
                <div className="flex items-center w-10/12 justify-between">
                  <img src={cafeData.avatar} className="w-2/12" />
                  <div className="flex flex-col w-2/3">
                    {cafeInfo("카페 명", cafeData.name)}
                    {cafeInfo("주소", cafeData.address)}
                    {cafeInfo("전화번호", phone_numberChanger(cafeData.phone_number))}
                  </div>
                </div>
              </Link>
              <div className="flex flex-col items-center ml-6">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" onChange={() => { router.reload(); cafeData.force_closed ? setCafeOpened(cafeData.id, user?.token) : setCafeClosed(cafeData.id, user?.token) }} checked={cafeData.force_closed} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-slate-400 peer-checked:bg-slate-600 hover:ring-4 hover:ring-slate-400" />
                  <div className="bg-white border border-slate-400 w-5 h-5 rounded-full absolute top-[2px] left-[2px] transition-all peer peer-checked:translate-x-full peer-checked:border-white" />
                </label>
                <div className="mt-2">임시 휴업</div>
              </div>
            </div>
          ))}
      </div>
      <Link href="/admin/register-cafe" className="mt-3 outlined w-1/4 text-center shadow transition-all mx-auto  hover:ring-2 hover:ring-black hover:bg-slate-300 focus:bg-slate-300">
        카페 등록하기
      </Link>
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
