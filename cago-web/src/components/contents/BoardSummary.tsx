import { Article } from "lib/board";

interface Props {
  articles: Article[];
}

const BoardSummary = ({ articles }: Props) => {
  return (
    /* 
            showing all board
            Todo: When board length goes to large it sould show some of the boards
        */
    <main>
      {articles.length > 0 ? (
        <>
          <div>공지사항을 추가 및 삭제 하려면 자세히 버튼을 눌러주세요.</div>
          <div className="flex scrollbar-hide overflow-x-auto">
            {articles.map((article) => {
              return (
                <div key={`article-${article.id}`} className="outlined m-4 min-w-[16rem] max-w-[16rem] h-48">
                  <h4 className="text-justify text-lg h-full break-all overflow-y-auto scrollbar-hide">
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
    </main>
  );
};

export default BoardSummary;
