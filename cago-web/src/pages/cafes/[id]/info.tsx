import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import CafeIntroduction from "components/contents/CafeIntroduction";
import CafeStatistic from "components/contents/CafeStatistics";
import BusinessInformation from "components/contents/BusinessInformation";

const Info: NextPageWithLayout = () => {
  return (
    <>
      <CafeStatistic />
      <CafeIntroduction />
      <BusinessInformation />
    </>
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
