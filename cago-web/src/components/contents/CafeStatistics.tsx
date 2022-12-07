interface Props {
  bestStrength: string;
  numReviews: number;
  numLikes: number;
}

export const StatisticBox = ({ title, content }: { title: string; content: string | number }) => {
  return (
    <div className="bg-slate-50 shadow-lg text-center p-4 rounded-lg w-full">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-2xl font-bold">{content}</p>
    </div>
  );
};

const CafeStatistics = (props: Props) => {
  const { bestStrength, numReviews, numLikes } = props;

  return (
    <>
      <h2 className="text-lg font-semibold text-center mb-4">통계</h2>
      <div className="flex flex-col sm:flex-row gap-2 justify-between flex-1 flex-shrink">
        <StatisticBox title="대표 장점" content={bestStrength} />
        <StatisticBox title="리뷰 개수" content={numReviews} />
        <StatisticBox title="좋아요" content={numLikes} />
      </div>
    </>
  );
};

export default CafeStatistics;
