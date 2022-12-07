import { Review } from "lib/review";

interface Stars {
  rating: 1 | 2 | 3 | 4 | 5;
}

interface Props {
  reviews: Review[];
}

export const Star = ({ rating }: Stars) => {
  return <span>{"★".repeat(rating) + "☆".repeat(5 - rating)}</span>;
};

const ReviewSummary = ({ reviews }: Props) => {
  return (
    <main className="flex flex-row">
      {/* Check if review is existed. */}
      {reviews.length === 0 ? (
        <div className="m-2 y-1/2 w-full">작성된 리뷰가 없습니다.</div>
      ) : (
        <div className="flex overflow-auto scrollbar-hide text-center gap-2">
          {reviews.slice(0, 16).map((review) => {
            return (
              <div
                key={`review-${review.id}`}
                className="bg-slate-50 hover:bg-slate-100 shadow-lg rounded-lg py-2 px-4 mb-2 min-w-fit flex flex-col"
              >
                <Star rating={review.rating} />
                <div className="my-1 text-xl">{review.strength}</div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ReviewSummary;
