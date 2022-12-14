import ArticleCard from "components/contents/ArticleCard";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useArticles } from "lib/board";
import { useCafe } from "lib/cafe";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const DashboardBoard: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { cafe } = useCafe(cafeId);
  const { articles } = useArticles(cafeId);

  const postArticleButton = (
    <div className="w-full text-right mt-8 mb-2">
      <Link href={`/admin/dashboard/${router.query.cafe_id}/board/post`} className="contained">
        게시글 작성
      </Link>
    </div>
  );

  return (
    <main>
      {postArticleButton}

      {cafe?.is_managed &&
        articles.map((article) => {
          return (
            <ArticleCard
              key={`article_${article.id}`}
              cafeName={cafe.name}
              cafeAvatar={cafe.avatar}
              article={article}
              editable
            />
          );
        })}
    </main>
  );
};

DashboardBoard.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default DashboardBoard;
