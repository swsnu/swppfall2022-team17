import { useAuth } from "lib/auth";
import { createReview } from "lib/review";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  cafe_id: number;
}

const CreateReviewForm = (props: Props) => {
  const { user } = useAuth();
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [strength, setStrength] = useState<"Taste" | "Service" | "Mood">("Taste");
  const router = useRouter();
  const cafe_id = props.cafe_id;
  const redirect = `/cafes/${cafe_id}/reviews/`;

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    // Create new review.
    if (user) {
      try {
        await createReview(cafe_id, content, rating, strength, user.token);
        router.replace(redirect);
      } catch (e) {
        const error = e as Error;
        window.alert(error.message);
      }
    }
  };

  const ratingStars = (
    <div className="flex flex-col border-2 border-slate-900 text-black font-bold py-2 px-4 mb-6 rounded w-full shadow-md">
      {/* <h2 className="text-2xl font-semibold text-center my-2">{"평점 : " + rating}</h2> */}
      <div className="flex justify-center text-3xl">
        <button className="hover:bg-slate-200 rounded-full p-2" type="button" onClick={() => setRating(1)}>
          ★
        </button>
        <button className="hover:bg-slate-200 rounded-full p-2" type="button" onClick={() => setRating(2)}>
          {rating >= 2 ? "★" : "☆"}
        </button>
        <button className="hover:bg-slate-200 rounded-full p-2" type="button" onClick={() => setRating(3)}>
          {rating >= 3 ? "★" : "☆"}
        </button>
        <button className="hover:bg-slate-200 rounded-full p-2" type="button" onClick={() => setRating(4)}>
          {rating >= 4 ? "★" : "☆"}
        </button>
        <button className="hover:bg-slate-200 rounded-full p-2" type="button" onClick={() => setRating(5)}>
          {rating >= 5 ? "★" : "☆"}
        </button>
      </div>
    </div>
  );

  const selectStrength = (selected: "Taste" | "Service" | "Mood") => {
    setStrength(selected);
  };

  const strengthSelect = (
    <div className="flex flex-col border-2 border-slate-900 py-2 px-4 mb-6 rounded w-full shadow-md">
      <h2 className="text-xl font-semibold text-center my-2">장점 선택</h2>
      <div className="flex gap-2 w-full my-3 text-xl font-semibold text-center">
        <button
          className={`hover:bg-slate-200 shadow-lg py-6 rounded-lg w-full ${
            strength === "Taste" ? "bg-slate-200" : "bg-slate-50"
          }`}
          type="button"
          onClick={() => selectStrength("Taste")}
        >
          Taste
        </button>
        <button
          className={`hover:bg-slate-200 shadow-lg py-6 rounded-lg w-full ${
            strength === "Service" ? "bg-slate-200" : "bg-slate-50"
          }`}
          type="button"
          onClick={() => selectStrength("Service")}
        >
          Service
        </button>
        <button
          className={`hover:bg-slate-200 shadow-lg py-6 rounded-lg w-full ${
            strength === "Mood" ? "bg-slate-200" : "bg-slate-50"
          }`}
          type="button"
          onClick={() => selectStrength("Mood")}
        >
          Mood
        </button>
      </div>
    </div>
  );

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {ratingStars}
      {strengthSelect}
      <input
        type="text"
        aria-label="review-content"
        placeholder="리뷰 내용"
        required
        autoFocus
        onChange={(e) => setContent(e.target.value)}
        className="outlined font-normal mb-2 w-full"
      />
      <button type="submit" className="contained w-full">
        리뷰 작성
      </button>
    </form>
  );
};

export default CreateReviewForm;
