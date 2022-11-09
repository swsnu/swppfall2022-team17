import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import CafeIntroductionForm from "components/forms/CafeIntroductionForm";
import CafeStatisticForm from "components/forms/CafeStatisticsForm";
import BusinessIntroductionForm from "components/forms/BusinessIntroductionForm";

const Info: NextPageWithLayout = () => {
  return (
    <>
      <CafeStatisticForm />
      <CafeIntroductionForm />
      <BusinessIntroductionForm />
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
