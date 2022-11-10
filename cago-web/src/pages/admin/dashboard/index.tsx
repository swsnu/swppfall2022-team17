import AdmimDashboardContents from "components/contents/AdminDashboardContents";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";

const Dashboard: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col h-screen place-content-evenly justify-center">
      <h1 className="container contents-top text-center text-3xl italic font-bold mb-8">
        운영중인 카페
      </h1>
      <div className="grid contents-center mb-4">
        <AdmimDashboardContents />
      </div>
      <div>
        <Link
          href="/admin/register-cafe"
          className="block w-fit mx-auto outlined"
        >
          카페 등록하기
        </Link>
      </div>
    </main>
  );
};

Dashboard.getLayout = (page) => (
  <>
    <CagoAdminHeader />
    <Container>{page}</Container>
  </>
);

export default Dashboard;
