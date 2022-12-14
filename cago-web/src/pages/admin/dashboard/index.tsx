import { AxiosError } from "axios";
import ActivityToggleButton from "components/contents/ActivityToggleButton";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { useAuth } from "lib/auth";
import { ManagedCafe } from "lib/cafe";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";
import useSWR from "swr";
import { getCagoRequest, parseE164 } from "utils";

const Dashboard: NextPageWithLayout = () => {
  const { user } = useAuth();

  const { data: cafes } = useSWR<ManagedCafe[], AxiosError>(
    user && `/cafes/?manager=${user.id}`,
    getCagoRequest("get")
  );

  return (
    <main className="mt-8 mb-32">
      <h1 className="font-bold text-3xl mb-8">관리 중인 카페</h1>
      <div className="flex flex-col mb-4 gap-2">
        {cafes &&
          cafes.map((cafe) => {
            return (
              <div key={cafe.id} className="relative zoom">
                <Link
                  href={`/admin/dashboard/${cafe.id}`}
                  className="block w-full pl-12 pr-24 py-5 shadow-lg rounded-lg"
                >
                  {/* Name */}
                  <h2 className="text-lg font-bold mb-2">{cafe.name}</h2>

                  {/* Address & phone */}
                  <div className="md:flex">
                    <h3>{cafe.address}</h3>
                    <div className="px-4 hidden md:block">|</div>
                    <h3>{parseE164(cafe.phone_number)}</h3>
                  </div>
                </Link>

                {/* Toggle Switch */}
                <div className="z-10 absolute right-6 bottom-1/2 translate-y-1/2">
                  <ActivityToggleButton cafe={cafe} />
                </div>
              </div>
            );
          })}
      </div>
      <Link href="/admin/register-cafe" className="contained block w-full text-center py-4">
        카페 등록하기
      </Link>
    </main>
  );
};

Dashboard.getLayout = (page) => (
  <RequireLogin>
    <CagoAdminHeader />
    <Container>{page}</Container>
  </RequireLogin>
);

export default Dashboard;
