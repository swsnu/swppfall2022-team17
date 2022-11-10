import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import CafeMenuContents from "components/contents/CafeMenuContents";

const Menu: NextPageWithLayout = () => {
  return (
    <>
      <CafeMenuContents />
    </>
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
