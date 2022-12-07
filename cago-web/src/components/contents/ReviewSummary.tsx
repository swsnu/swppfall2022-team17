import { Review } from "lib/review";

interface Stars {
  rating: number;
}

interface Props {
  reviews: Review[];
}

export const Star = ({ rating }: Stars) => {
  return rating <= 1 ? (
    <span>★☆☆☆☆</span>
  ) : rating <= 2 ? (
    <span>★★☆☆☆</span>
  ) : rating <= 3 ? (
    <span>★★★☆☆</span>
  ) : rating <= 4 ? (
    <span>★★★★☆</span>
  ) : (
    <span>★★★★★</span>
  );
};

const ReviewSummary = ({ reviews }: Props) => {
  return (
    <main className="flex flex-row">
      {/* Check if review is existed. */}
      {reviews.length === 0 ? (
        <div className="m-2 y-1/2 w-full">작성된 리뷰가 없습니다.</div>
      ) : (
        <div className="flex flex-wrap justify-start w-full min-w-fit">
          {reviews.slice(0, 16).map((review) => {
            return (
              <div
                key={`${review.id} main container`}
                className="bg-slate-50 hover:bg-slate-100 shadow-lg p-2 mb-2 w-[12.5%] min-w-fit flex flex-col"
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
