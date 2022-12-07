import { StatisticBox } from './CafeStatistics';
interface Props {
  bestStrength: string;
  numReviews: number;
  averageRating: number;
}

const CafeReviewStatistics = (props: Props) => {
  const { bestStrength, numReviews, averageRating } = props;
  const rating = averageRating ? averageRating.toFixed(1) : (0.0).toFixed(1);  

  return (
    <>
      <h2 className="text-lg font-semibold text-center mb-4">리뷰 통계</h2>
      <div className="flex gap-2 justify-between flex-1 flex-shrink">
        <StatisticBox title="대표 장점" content={bestStrength} />
        <StatisticBox title="리뷰 개수" content={numReviews} />
        <StatisticBox title="리뷰 평점" content={rating} />
      </div>
    </>
  );
};

export default CafeReviewStatistics;
