import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";

const Menu: NextPageWithLayout = () => {
  return (
    <main>
      <h1 className="text-center italic">(Menu)</h1>
      <div className="h-screen" />
    </main>
  );
};

Menu.getLayout = (page) => (
  <>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </>
);

export default Menu;
