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
  const router = useRouter();
  const { articles } = useArticles(router.query.cafe_id);
  const postArticleButton = (
    <div className="w-full text-right mt-8 mb-2">
      <Link
        href={`/admin/dashboard/${router.query.cafe_id}/board/post`}
        className="contained"
      >
        게시글 작성
      </Link>
    </div>
  );
  return (
    <main>
      {postArticleButton}
      {articles &&
        articles.map((at) => {
          return <ArticlePreview key={`${at.id}_article`} {...at} editable={true} />;
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
