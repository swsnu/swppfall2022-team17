import CafeReviewCard from "components/contents/CafeReviewCard";
import StatisticsContainer from "components/contents/CafeStatisticsContainer";
import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireProfile from "components/layouts/RequireProfile";
import { useCafe } from "lib/cafe";
import { useReviews } from "lib/review";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const CafeReview: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { cafe, bestStrength } = useCafe(cafeId);
  const { reviews } = useReviews(cafeId);

  return (
    <main>
      <div className="w-full text-right mt-8 mb-2">
        <Link href={`/cafes/${cafeId}/reviews/create`} className="contained">
          리뷰 작성
        </Link>
      </div>
      {cafe?.is_managed && (
        <>
          <div className="mt-6">
            <StatisticsContainer
              statList={[
                { name: "대표 장점", value: bestStrength! },
                { name: "리뷰 개수", value: cafe.num_reviews },
                { name: "리뷰 평점", value: cafe.average_rating.toFixed(1) },
              ]}
            />
          </div>
          <div className="mt-12 mb-24 flex flex-col gap-4">
            {reviews.map((review) => (
              <CafeReviewCard key={review.id} review={review} />
            ))}
            {reviews.length === 0 && (
              <h4 className="text-center text-lg font-light">작성된 리뷰가 없습니다.</h4>
            )}
          </div>
        </>
      )}
    </main>
  );
};

CafeReview.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </RequireProfile>
);

export default CafeReview;
