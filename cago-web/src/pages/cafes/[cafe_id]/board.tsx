import ArticlePreview from "components/contents/ArticlePreview";
import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { useArticles } from "lib/board";
import { useCafe } from "lib/cafe";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import RequireProfile from "../../../components/layouts/RequireProfile";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { cafe } = useCafe(cafeId);
  const { articles } = useArticles(cafeId);

  return (
    <main>
      {cafe?.is_managed &&
        articles.map((article) => {
          return (
            <ArticlePreview
              key={`article_${article.id}`}
              cafeName={cafe.name}
              cafeAvatar={cafe.avatar}
              article={article}
            />
          );
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
