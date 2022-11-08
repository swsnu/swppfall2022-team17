import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";

const Dashboard: NextPageWithLayout = () => {
  return (
    <main>
      <h1 className="text-center italic my-4">(Cago Admin Dashboard)</h1>
      <Link href="/admin/register-cafe" className="outlined">
        Register Cafe
      </Link>
      <div className="h-screen" />
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
