import CreateReviewForm from "components/forms/CreateReviewForm";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireProfile from "components/layouts/RequireProfile";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const CreateReview: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;

  return (
    <main className="flex flex-col mt-10 items-center justify-center">
      <h1 className="font-bold text-2xl mb-6">리뷰 작성하기</h1>
      <CreateReviewForm cafe_id={parseInt(cafeId)} />
    </main>
  );
};

CreateReview.getLayout = (page) => (
  <RequireLogin>
    <RequireProfile>
      <CagoHeader />
      <Container>{page}</Container>
    </RequireProfile>
  </RequireLogin>
);

export default CreateReview;
