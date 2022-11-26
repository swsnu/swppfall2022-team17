import { AxiosError } from "axios";
import { ManagedCafe } from "components/contents/CafesMap";
import CafeSummary from "components/contents/CafeSummary";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { useAuth } from "lib/auth";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";
import useSWR from "swr";
import { getCagoRequest } from "utils";

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
              <div key={cafe.id}>
                <CafeSummary cafe={cafe} />
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
