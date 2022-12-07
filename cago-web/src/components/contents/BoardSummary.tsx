import { Article } from "lib/board";

interface Props {
  articles: Article[];
}

const BoardSummary = ({ articles }: Props) => {
  return (
    <main className="flex flex-col w-full">
      {/* Check if main menu is existed */}
      {articles.length === 0 ? (
        <div className="m-2 y-1/2 w-full">
          공지 사항이 없습니다. 새로운 공지사항을 작성하려면 자세히 버튼을 눌러주세요.
        </div>
      ) : (
        <>
          <div className="mb-4">
            공지사항을 수정 및 삭제하거나 새로운 공지사항을 작성하려면 자세히 버튼을 눌러주세요.
          </div>
          <div className="flex flex-wrap justify-start w-full min-w-fit">
            {articles.slice(0, 6).map((article) => {
              return (
                <div
                  key={`${article.id} main container`}
                  className="bg-slate-50 hover:bg-slate-100 shadow-lg p-2 mb-2 w-1/3 max-w-full h-48 flex flex-col"
                >
                  <div className="flex flex-row justify-center h-fit w-full px-1">
                    <div className="text-lg font-bold"> {article.title} </div>
                  </div>
                  <hr className="mb-1 border-t-slate-300" />
                  <article className="px-1 text-md font-normal max-h-full max-w-full text-left break-all overflow-y-auto whitespace-pre-line">
                    {article.content}
                  </article>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default BoardSummary;
