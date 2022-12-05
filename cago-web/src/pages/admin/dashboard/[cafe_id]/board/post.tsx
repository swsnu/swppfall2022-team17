import PostArticleForm from "components/forms/PostArticleForm";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { NextPageWithLayout } from "pages/_app";

const PostArticle: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-6">새 게시글</h1>
      <div className="w-full">
        <PostArticleForm />
      </div>
    </main>
  );
};

PostArticle.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default PostArticle;
