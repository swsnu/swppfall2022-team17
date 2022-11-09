import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";

const Reviews: NextPageWithLayout = () => {
  return (
    <main>
      <h1 className="text-center italic">(reviews)</h1>
      <div className="h-screen" />
    </main>
  );
};

Reviews.getLayout = (page) => (
  <>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </>
);

export default Reviews;
