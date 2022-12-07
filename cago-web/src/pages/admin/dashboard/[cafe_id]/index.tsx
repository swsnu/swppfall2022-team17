import BoardSummary from "components/contents/BoardSummary";
import ImageView from "components/contents/ImageView";
import MenuSummary from "components/contents/MenuSummary";
import ReviewSummary from "components/contents/ReviewSummary";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useArticles } from "lib/board";
import { useCafe } from "lib/cafe";
import { useCafeImages } from "lib/image";
import { useMenu } from "lib/menu";
import { useReviews } from "lib/review";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

interface CafeInfoBoxProps {
  title: string;
  children: React.ReactNode;
  path?: string;
}

const CafeInfoContainer = ({ title, children, path }: CafeInfoBoxProps) => {
  return (
    <div className="outlined w-full h-full flex flex-col px-4 py-3 my-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl pl-2">{title}</h2>
        {path && (
          <Link href={path} className="contained">
            자세히
          </Link>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

const DashboardDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe } = useCafe(cafe_id);
  const { mainMenuList } = useMenu(cafe_id);
  const { reviews } = useReviews(cafe_id);
  const { articles } = useArticles(cafe_id);
  const { cafeImages } = useCafeImages(cafe_id);

  return (
    <main className="my-8">
      {cafe?.is_managed && (
        <div className="flex flex-col">
          <CafeInfoContainer title="카페 사진" path={`/admin/dashboard/${cafe_id}/add-pictures`}>
            <div className="max-w-full w-fit mx-auto">
              <ImageView images={cafeImages} />
            </div>
          </CafeInfoContainer>
          <CafeInfoContainer title="카페 소개" path={`/admin/dashboard/${cafe_id}/info`}>
            {cafe.introduction ?? "카페 소개를 작성해보세요!"}
          </CafeInfoContainer>
          <CafeInfoContainer title="메뉴" path={`/admin/dashboard/${cafe_id}/menu`}>
            <MenuSummary menuList={mainMenuList} />
          </CafeInfoContainer>
          <CafeInfoContainer title="리뷰" path={`/admin/dashboard/${cafe_id}/reviews`}>
            <ReviewSummary reviews={reviews} />
          </CafeInfoContainer>
          <CafeInfoContainer title="공지사항" path={`/admin/dashboard/${cafe_id}/board`}>
            <BoardSummary articles={articles} />
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
