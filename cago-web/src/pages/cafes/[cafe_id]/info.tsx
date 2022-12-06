import CafeIntroduction from "components/contents/CafeIntroduction";
import CafeStatistics from "components/contents/CafeStatistics";
import ImageView from "components/contents/ImageView";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireProfile from "components/layouts/RequireProfile";
import { useCafe } from "lib/cafe";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const CafeInfo: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe, bestStrength } = useCafe(cafe_id);

  // TODO: replace dummy image data
  const images: string[] = [
    "http://the-edit.co.kr/wp-content/uploads/2022/05/1400_retouched_-3-3.jpg",
    "http://the-edit.co.kr/wp-content/uploads/2022/05/1400_retouched_-1-2.jpg",
    "http://the-edit.co.kr/wp-content/uploads/2022/05/1400_retouched_-3-2.jpg",
  ];

  return (
    <main>
      <div className="max-w-full w-fit mx-auto mt-6">
        <ImageView images={images} />
      </div>

      {/* Introduction and Statistics */}
      {cafe?.is_managed && (
        <>
          <div className="mt-12">
            <CafeIntroduction introduction={cafe.introduction} />
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

CafeInfo.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    <Container>{page}</Container>
  </RequireProfile>
);

export default CafeInfo;
