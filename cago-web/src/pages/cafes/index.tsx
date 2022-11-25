import CafesMap from "components/contents/CafesMap";
import CagoHeader from "components/layouts/CagoHeader";
import RequireProfile from "components/layouts/RequireProfile";
import { NextPageWithLayout } from "pages/_app";

const Cafes: NextPageWithLayout = () => {
  return (
    <main>
      <CafesMap />
    </main>
  );
};

Cafes.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    {page}
  </RequireProfile>
);

export default Cafes;
