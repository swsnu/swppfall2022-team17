import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";

const Info: NextPageWithLayout = () => {
  return (
    <main>
      <h1 className="text-center italic">(Info)</h1>
      <div className="h-screen" />
    </main>
  );
};

Info.getLayout = (page) => (
  <>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </>
);

export default Info;
