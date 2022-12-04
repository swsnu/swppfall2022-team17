import { AxiosError } from "axios";
import { ManagedCafe } from "components/contents/CafesMap";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import useSWR from "swr";
import { getCagoRequest } from "utils";
import BoardSummary from "components/contents/BoardSummary"
import MenuSummary from "components/contents/MenuSummary"
import ReviewSummary from "components/contents/ReviewSummary"

interface CafeInfoBoxProps {
  title: string;
  children: React.ReactNode;
  path?: string;
}

const CafeInfoContainer = ({ title, children, path }: CafeInfoBoxProps) => {
  const router = useRouter();
  const { cafe_id } = router.query;

  return (
    <div className={`outlined w-full h-full flex flex-col px-4 py-3 my-2`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg">{title}</h2>
        {path && (
          <Link href={path} className="contained">
            자세히
          </Link>
        )}
      </div>
      <div className="border border-black shadow rounded-lg text-center p-4">{children}</div>
    </div>
  );
};

const DashboardDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe } = useSWR<ManagedCafe, AxiosError>(cafe_id && `/cafes/${cafe_id}/`, getCagoRequest());

  return (
    <main className="my-8">
      {cafe && (
        <div className="flex flex-col">
          <CafeInfoContainer title="카페 사진" path={`/admin/dashboard/${cafe_id}/add-pictures`}>
            {/* <ImageView/> */}
          </CafeInfoContainer>
          <CafeInfoContainer title="카페 소개" path={`/admin/dashboard/${cafe_id}/info`}>
            {cafe.introduction ?? "카페 소개를 작성해보세요!"}
          </CafeInfoContainer>
          <CafeInfoContainer title="메뉴" path={`/admin/dashboard/${cafe_id}/menu`}>
            <MenuSummary cafe_id={`${cafe_id}`}/>
          </CafeInfoContainer>
          <CafeInfoContainer title="리뷰" path={`/admin/dashboard/${cafe_id}/review`}>
            <ReviewSummary />
          </CafeInfoContainer>
          <CafeInfoContainer title="공지사항" path={`/admin/dashboard/${cafe_id}/board`}>
            <BoardSummary />
          </CafeInfoContainer>
          
        </div>
      )}
    </main>
  );
};

DashboardDetail.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default DashboardDetail;
