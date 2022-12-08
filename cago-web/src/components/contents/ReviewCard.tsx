import { useAuth } from "lib/auth";
import { deleteReview, Review } from "lib/review";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { Star } from "./ReviewSummary";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const { user } = useAuth();
  const deletable = user && user.id === review.author.user;

  const handleDelete = async () => {
    if (deletable) {
      await deleteReview(review.cafe, review.id, user.token);
    }
  };

  const strengthBox = (
    <div className="bg-gray-50 shadow-inner text-center py-4 px-6 rounded-lg min-w-fit w-32 mr-4">
      <h3 className="font-semibold mb-2 w-full">장점</h3>
      <p className="text-lg font-bold w-full">{review.strength}</p>
    </div>
  );

  const infoBar = (
    <div className="flex flex-wrap justify-between w-full h-full">
      <div className="flex gap-2 items-center h-full">
        <div className="relative w-8 h-8 xs:block hidden">
          <Image
            src={review.author.avatar}
            alt="review-author-profile-avatar"
            fill
            className="rounded-full border border-gray-800"
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
    <div className="relative shadow-lg rounded w-full h-full flex p-4 zoom">
      {strengthBox}
      <div className="w-full h-full">
        {infoBar}
        <hr className="border-t-gray-300 my-2" />
        <article className="font-normal break-all">{review.content}</article>
      </div>
      {deletable && (
        <button aria-label="delete" onClick={(e) => handleDelete()} className="absolute top-0 right-0">
          <IoMdClose />
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
