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

interface SummaryContainerProps {
  title: string;
  children: React.ReactNode;
  path: string;
}

const SummaryContainer = ({ title, children, path }: SummaryContainerProps) => {
  return (
    <div className="w-full h-full p-4 shadow-inner bg-gray-50 rounded-lg">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold pl-2">{title}</h2>
        <Link href={path} className="contained">
          자세히
        </Link>
      </header>
      <hr className="my-2" />
      <main className="p-4">{children}</main>
    </div>
  );
};

const DashboardDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { cafe } = useCafe(cafeId);
  const { mainMenuList } = useMenu(cafeId);
  const { reviews } = useReviews(cafeId);
  const { articles } = useArticles(cafeId);
  const { cafeImages } = useCafeImages(cafeId);

  return (
    <main className="my-8">
      {cafe?.is_managed && (
        <div className="flex flex-col gap-5">
          <SummaryContainer title="카페 사진" path={`/admin/dashboard/${cafeId}/add-pictures`}>
            <div className="max-w-full w-fit mx-auto">
              <ImageView images={cafeImages.map((ci) => ci.url)} />
            </div>
          </SummaryContainer>
          <SummaryContainer title="카페 소개" path={`/admin/dashboard/${cafeId}/info`}>
            {cafe.introduction ?? "카페 소개를 작성해보세요!"}
          </SummaryContainer>
          <SummaryContainer title="메뉴" path={`/admin/dashboard/${cafeId}/menu`}>
            <MenuSummary menuList={mainMenuList} />
          </SummaryContainer>
          <SummaryContainer title="리뷰" path={`/admin/dashboard/${cafeId}/reviews`}>
            <ReviewSummary reviews={reviews} />
          </SummaryContainer>
          <SummaryContainer title="공지사항" path={`/admin/dashboard/${cafeId}/board`}>
            <BoardSummary articles={articles} />
          </SummaryContainer>
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
