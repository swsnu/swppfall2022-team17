import ArticlePreview from "components/contents/ArticlePreview";
import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";
import articlesData from "data/articles.json";
import { useRouter } from "next/router";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const id = (typeof router.query.id === "string") ? parseInt(router.query.id) : 0; 
  return (
    <main>
      { articlesData.filter((at) => at.author.id === id).map((at) => {
        return <ArticlePreview key = {`${at.id}_article`} {...at} />
      })}
    </main>
  );
};

Board.getLayout = (page) => (
  <>
    <CagoHeader />
    <Container>
      {page}
      <CafeButtonGroup />
    </Container>
  </>
);

export default Board;
