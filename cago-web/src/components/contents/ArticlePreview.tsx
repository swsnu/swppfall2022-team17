import { Article } from "lib/board";
import Image from "next/image";
import Link from "next/link";

const ArticlePreview = (article: Article) => {
  const cafeProfileTitleHeader = (
    <header className="sticky top-0">
      <ul className="flex justify-between items-center h-12 py-2 px-1 shadow-sm">
        <li>
          <Link href={`/cafes/${article.author.id}/info`} className="flex gap-[10px]">
            <Image
              loader={() => article.author.avatar}
              src={article.author.avatar}
              alt="cafe-profile-avatar"
              width={35}
              height={35}
              className="mx-auto rounded-full border border-slate-800 h-full"
            />
            <div className="text-sm font-bold leading-loose">
              {article.author.display_name}
              {/* TODO 중앙정렬 */}
            </div>
          </Link>
        </li>
        <li>
          <div className="text-xl font-extrabold">{article.title}</div>
        </li>
        <li>
          {/* <h2>{article.created_at}</h2> */}
          <div className="text-sm font-light">(게시 시간)</div>
        </li>
      </ul>
    </header>
  );

  const articleContent = (
    <article className="text-lg font-normal overflow-y-auto pr-1 mb-1 mx-1 mt-1 whitespace-pre-line">
      {article.content}
    </article>
  );

  return (
    <div className="flex flex-col justify-start max-h-[50vh] break-all shadow-md my-3">
      {cafeProfileTitleHeader}
      {articleContent}
    </div>
  );
};

export default ArticlePreview;
