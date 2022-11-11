import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireProfile from "components/layouts/RequireProfile";
import { NextPageWithLayout } from "pages/_app";

const Cafes: NextPageWithLayout = () => {
  return (
    <main>
      <h1 className="text-center italic">(Cafes)</h1>
      <div className="h-screen" />
    </main>
  );
};

Cafes.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    <Container>{page}</Container>
  </RequireProfile>
);

export default Cafes;
