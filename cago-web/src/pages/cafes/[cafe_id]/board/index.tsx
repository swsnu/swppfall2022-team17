import ArticlePreview from "components/contents/ArticlePreview";
import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import { useRouter } from "next/router";
import { useArticles } from "lib/board";
import RequireProfile from "../../../../components/layouts/RequireProfile";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const { articles } = useArticles(router.query.cafe_id);
  return (
    <main>
      {articles &&
        articles.map((at) => {
          return <ArticlePreview key={`${at.id}_article`} {...at} editable={false} />;
        })}
    </main>
  );
};

Board.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </RequireProfile>
);

export default Board;
