import ArticlePreview from "components/contents/ArticlePreview";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import articlesData from "data/articles.json";
import { useRouter } from "next/router";
import RequireLogin from "components/layouts/RequireLogin";
import Link from "next/link";

const Board: NextPageWithLayout = () => {
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
      {articlesData
        .filter((at) => at.author.id === id)
        .map((at) => {
          return <ArticlePreview key={`${at.id}_article`} {...at} />;
        })}
    </main>
  );
};

Board.getLayout = (page) => (
  <RequireLogin>
    <CagoAdminHeader />
    <Container>{page}</Container>
  </RequireLogin>
);

export default Board;
