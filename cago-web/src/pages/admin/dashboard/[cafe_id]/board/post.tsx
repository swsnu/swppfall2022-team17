import PostArticleForm from "components/forms/PostArticleForm";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { NextPageWithLayout } from "pages/_app";

const DashboardBoardPost: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col mt-10 items-center justify-center">
      <h1 className="font-bold text-4xl mb-6">새 게시글</h1>
      <div className="w-full">
        <PostArticleForm />
      </div>
    </main>
  );
};

DashboardBoardPost.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default DashboardBoardPost;
