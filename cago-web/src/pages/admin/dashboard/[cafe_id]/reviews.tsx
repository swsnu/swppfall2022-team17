import CafeReviewCard from "components/contents/CafeReviewCard";
import CafeReviewStatistics from "components/contents/CafeReviewStatistics";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useCafe } from "lib/cafe";
import { useReviews } from "lib/review";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const CafeDashboardReview: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe, bestStrength } = useCafe(cafe_id);
  const { reviews } = useReviews(cafe_id);

  return (
    <main>
      {cafe?.is_managed && (
        <>
          <div className="mt-6">
            <CafeReviewStatistics
              bestStrength={bestStrength!}
              numReviews={cafe.num_reviews}
              averageRating={cafe.average_rating}
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

CafeDashboardReview.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default CafeDashboardReview;
