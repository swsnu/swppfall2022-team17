import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import RequireProfile from "components/layouts/RequireProfile";
import { NextPageWithLayout } from "pages/_app";
import CafeIntroduction from "components/contents/CafeIntroduction";
import CafeStatistics from "components/contents/CafeStatistics";
import ImageView from "components/contents/ImageView";
import Container from "components/layouts/Container";

const CafeDashboardInfo: NextPageWithLayout = () => {
  const data = [
    "	http://the-edit.co.kr/wp-content/uploads/2022/05/1400_retouched_-3-3.jpg",
    "	http://the-edit.co.kr/wp-content/uploads/2022/05/1400_retouched_-1-2.jpg",
    " https://img.hankyung.com/photo/202101/01.25050275.1.jpg",
    "	https://img.khan.co.kr/newsmaker/1193/20160913_68.jpg",
  ];
  return (
    <main>
      <ImageView images={data} style={{ height: 480, width: 720 }} />
      <CafeIntroduction />
      <CafeStatistics />
    </main>
  );
};

CafeDashboardInfo.getLayout = (page) => (
  <RequireProfile>
    <CagoAdminHeader />
    <Container>{page}</Container>
  </RequireProfile>
);

export default CafeDashboardInfo;
