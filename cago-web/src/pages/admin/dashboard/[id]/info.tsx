import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import CafeIntroduction from "components/contents/CafeIntroduction";
import CafeStatistic from "components/contents/CafeStatistics";
import BusinessIntroduction from "components/contents/BusinessIntroduction";

const Info: NextPageWithLayout = () => {
  return (
    <>
      <CafeStatistic />
      <CafeIntroduction />
      <BusinessIntroduction />
    </>
  );
};

Info.getLayout = (page) => {
  return (
    <>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </>
  );
};

export default Info;
