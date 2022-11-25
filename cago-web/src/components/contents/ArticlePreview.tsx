import { Article } from "lib/board";
import Image from "next/image";
import Link from "next/link";

const ArticlePreview = (article: Article) => {
  const cafeProfileTitleHeader = (
    <header className="sticky top-0">
      <ul className="flex items-center h-12 py-2 px-1 shadow-sm">
        <li className="float-left w-1/3 text-left">
          <ul className="flex justify-start gap-2">
            <li>
              <Link href={`/cafes/${article.author.id}/info`} className="">
                {/* TODO admin page redirects to admin/dashboard/:id */}
                <Image
                  loader={() => article.author.avatar}
                  src={article.author.avatar}
                  alt="cafe-profile-avatar"
                  width={35}
                  height={35}
                  className="flex rounded-full border border-slate-800 h-full"
                />
              </Link>
            </li>
            <li>
              <Link
                href={`/cafes/${article.author.id}/info`}
                className="text-sm font-bold leading-loose"
              >
                {article.author.name}
              </Link>
            </li>
          </ul>
        </li>
        <li className="float-left w-1/3 text-center">
          <div className="text-xl font-extrabold">{article.title}</div>
        </li>
        <li className="float-left w-1/3 text-right">
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
