import ArticlePreview from "components/contents/ArticlePreview";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useArticles } from "lib/board";
import { useCafe } from "lib/cafe";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const AdminBoard: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { data: cafe } = useCafe(cafe_id);
  const { articles } = useArticles(cafe_id);

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
            <ArticlePreview
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

AdminBoard.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default AdminBoard;
