import ArticlePreview from "components/contents/ArticlePreview";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import { useRouter } from "next/router";
import RequireLogin from "components/layouts/RequireLogin";
import Link from "next/link";
import { useArticles } from "lib/board";
import RequireManager from "components/layouts/RequireManager";

const AdminBoard: NextPageWithLayout = () => {
  const { articles } = useArticles();
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : 0;
  const postArticleButton = (
    <Link
      href={`/admin/dashboard/${router.query.id}/board/post`}
      className="block w-fit mx-auto outlined mt-4"
    >
      게시글 작성
    </Link>
  );
  return (
    <main>
      {postArticleButton}
      {articles &&
        articles
          .filter((at) => at.author.id === id)
          .map((at) => {
            return <ArticlePreview key={`${at.id}_article`} {...at} />;
          })}
    </main>
  );
};

AdminBoard.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default AdminBoard;
