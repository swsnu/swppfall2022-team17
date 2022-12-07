import CafeIntroduction from "components/contents/CafeIntroduction";
import CafeStatistics from "components/contents/CafeStatistics";
import ImageView from "components/contents/ImageView";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useCafe } from "lib/cafe";
import { useCafeImages } from "lib/image";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const CafeDashboardInfo: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe, bestStrength } = useCafe(cafe_id);
  const { cafeImages } = useCafeImages(cafe_id);

  return (
    <main>
      <div className="max-w-full w-fit mx-auto mt-6">
        <ImageView images={cafeImages.map(ci => ci.url)} />
      </div>

      {/* Introduction and Statistics */}
      {cafe?.is_managed && (
        <>
          <div className="mt-12">
            <CafeIntroduction editable cafeId={cafe.id} introduction={cafe.introduction} />
          </div>
          <div className="mt-12 mb-24">
            <CafeStatistics
              bestStrength={bestStrength!}
              numReviews={cafe.num_reviews}
              numLikes={cafe.num_likes}
            />
          </div>
        </>
      )}
    </main>
  );
};

CafeDashboardInfo.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default CafeDashboardInfo;
