import { Article } from "lib/board";

interface Props {
  articles: Article[];
}

const BoardSummary = ({ articles }: Props) => {
  return (
    <>
      {articles.length > 0 ? (
        <>
          <div>공지사항을 추가 및 삭제 하려면 자세히 버튼을 눌러주세요.</div>
          <div className="flex scrollbar-hide overflow-x-auto gap-4">
            {articles.map((article) => {
              return (
                <div
                  key={`article-${article.id}`}
                  className="shadow-lg rounded-lg p-4 my-2 bg-white hover:bg-gray-50"
                >
                  <h4 className="w-48 h-32 text-justify text-md break-all overflow-y-auto scrollbar-hide">
                    {article.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>공지사항이 없습니다. 추가하려면 자세히 버튼을 눌러주세요</div>
      )}
    </>
  );
};

export default BoardSummary;
