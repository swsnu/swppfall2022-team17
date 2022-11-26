import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import CafeIntroduction from "components/contents/CafeIntroduction";
import CafeStatistic from "components/contents/CafeStatistics";
import BusinessInformation from "components/contents/BusinessInformation";
import RequireLogin from "components/layouts/RequireLogin";

const Info: NextPageWithLayout = () => {
  return (
    <div>
      <CafeIntroduction />
      <CafeStatistic />
      <BusinessInformation />
    </div>
  );
};

Info.getLayout = (page) => {
  return (
    //<RequireLogin>
    <>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </>
    //</RequireLogin>
  );
};

export default Info;
