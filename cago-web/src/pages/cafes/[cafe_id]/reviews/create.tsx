import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireProfile from "components/layouts/RequireProfile";
import { NextPageWithLayout } from "pages/_app";

const CreateReview: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col mt-10 items-center justify-center">
      <h1 className="font-bold text-4xl mb-6">새 리뷰</h1>
      <div className="w-full">
        11
      </div>
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
