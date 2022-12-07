import { useAuth } from "lib/auth";
import { deleteReview, Review } from "lib/review";
import Image from "next/image";
import { Star } from "./ReviewSummary";

interface Props {
  review: Review;
}

const CafeReviewCard = ({ review }: Props) => {
  const { user } = useAuth();
  const deletable = user && user.id === review.author.user;

  const handleDelete = async () => {
    if (deletable) {
      await deleteReview(review.cafe, review.id, user.token);
    }
  };

  const strengthBox = (
    <div className="bg-slate-50 shadow-inner text-center py-4 px-6 rounded-lg min-w-fit mr-4">
      <h3 className="font-semibold mb-2 w-full">장점</h3>
      <p className="text-lg font-bold w-full">{review.strength}</p>
    </div>
  );

  const infoBar = (
    <div className="flex flex-wrap justify-between w-full h-full">
      <div className="flex gap-2 items-center h-full">
        <div className="relative w-8 h-8 xs:block hidden">
          <Image
            loader={() => review.author.avatar}
            src={review.author.avatar}
            alt="review-author-profile-avatar"
            fill
            className="rounded-full border border-slate-800"
          />
        </div>
        <div className="font-bold">{review.author.display_name}</div>
      </div>
      <div className="text-lg">
        <Star rating={review.rating} />
      </div>
    </div>
  );

  return (
    <div className="shadow-lg rounded w-full h-full flex p-4">
      {strengthBox}
      <div className="flex flex-col w-full h-full">
        {infoBar}
        <hr className="border-t-slate-300 my-2" />
        <article className="h-18 w-full font-normal leading-tight overflow-y-auto break-all">
          {review.content}
        </article>
      </div>
    </div>
  );
};

export default CafeReviewCard;
