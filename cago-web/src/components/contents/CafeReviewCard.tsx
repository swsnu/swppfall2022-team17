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
    <div className="bg-slate-50 shadow-lg text-center p-4 rounded-lg w-1/6 mr-4">
      <h3 className="font-semibold text-lg mb-2 w-full">장점</h3>
      <p className="text-2xl font-bold w-full">{review.strength}</p>
    </div>
  );

  const infoBar = (
    <div className="flex justify-between w-full h-full px-2">
      <div className="flex justify-start h-full">
        <div>
          <Image
            loader={() => review.author.avatar}
            src={review.author.avatar}
            alt="review-author-profile-avatar"
            width={35}
            height={35}
            className="flex rounded-full border border-slate-800 my-1"
          />
        </div>
        <div className="text-lg font-bold leading-loose pl-2">
          {review.author.display_name}
        </div>
      </div>
      <div className="text-2xl">{Star({ rating: review.rating })}</div>
    </div>
  );

  return (
    <div className="outlined w-full h-full flex justify-start px-4 py-3 my-2">
      {strengthBox}
      <div className="flex flex-col w-full h-full pt-2 px-1">
        {infoBar}
        <hr className="border-t-slate-300" />
        <div className="flex items-center h-[79px] w-full pt-1 align-middle">
          <div className="text-lg font-normal leading-tight overflow-y-auto px-2 pt-1 w-full y-fit max-h-full break-all">
            {review.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeReviewCard;
