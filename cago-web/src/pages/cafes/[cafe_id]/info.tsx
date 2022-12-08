import CafeIntroduction from "components/contents/CafeIntroduction";
import ImageView from "components/contents/ImageView";
import StatisticsContainer from "components/contents/StatisticsContainer";
import CagoButtonGroup from "components/layouts/CagoButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireProfile from "components/layouts/RequireProfile";
import { useCafe } from "lib/cafe";
import { useCafeImages } from "lib/image";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const Info: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { cafe, bestStrength } = useCafe(cafeId);
  const { cafeImages } = useCafeImages(cafeId);

  return (
    <main>
      <div className="max-w-full w-fit mx-auto mt-6">
        <ImageView images={cafeImages.map((ci) => ci.url)} />
      </div>

      {/* Introduction and Statistics */}
      {cafe?.is_managed && (
        <>
          <div className="mt-12">
            <CafeIntroduction introduction={cafe.introduction} />
          </div>
          <div className="mt-12 mb-24">
            <StatisticsContainer
              statList={[
                { name: "대표 장점", value: bestStrength! },
                { name: "리뷰 개수", value: cafe.num_reviews },
                { name: "좋아요 개수", value: cafe.num_likes },
              ]}
            />
          </div>
        </>
      )}
    </main>
  );
};

Info.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    <Container>
      {page}
      <CagoButtonGroup />
    </Container>
  </RequireProfile>
);

export default Info;
