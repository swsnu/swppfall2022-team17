import CafesMap from "components/contents/CafesMap";
import CagoHeader from "components/layouts/CagoHeader";
import { NextPageWithLayout } from "pages/_app";

const Cafes: NextPageWithLayout = () => {
  return (
    <main>
      <CafesMap />
    </main>
  );
};

Cafes.getLayout = (page) => (
  <>
    <CagoHeader />
    {page}
  </>
);

export default Cafes;
