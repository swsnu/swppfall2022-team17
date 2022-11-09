import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";

const Board: NextPageWithLayout = () => {
  return (
    <main>
      <h1 className="text-center italic">(Articles)</h1>
      <div className="h-screen" />
    </main>
  );
};

Board.getLayout = (page) => (
  <>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </>
);

export default Board;
