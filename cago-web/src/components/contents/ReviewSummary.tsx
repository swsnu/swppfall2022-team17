import temp_review from 'components/contents/temp_data/temp_review.json'
import { Review } from 'lib/review';

interface Stars {
    rating: number;
}

interface TempReview {
    id: number;
    author_id: number;
    content: string;
    rating: number;
    strength: string;
  }

const temp_list_review: TempReview[] = temp_review
/*** 
 * Todo : Work with api
 * ***/

/* for review stars */
export const Star = ({ rating }: Stars) => {
    return(
    rating <= 1 ?
        <span>★☆☆☆☆</span>
        : rating <= 2 ?
            <span>★★☆☆☆</span>
            : rating <= 3 ?
                <span>★★★☆☆</span>
                : rating <= 4 ?
                    <span>★★★★☆</span>
                    : <span>★★★★★</span>)

}

const ReviewSummary = () => {
    return (
        <main className='flex flex-row overflow-auto scrollbar-hide'>
            {temp_list_review.map((review) => {
                return (
                    <div key={`${review.id} review container`} className='flex flex-col min-w-fit outlined m-2'>
                        <Star rating={review.rating} />
                        <div className='my-2'>{review.content}</div>
                    </div>
                )
            })}
        </main>
    )
};

export default ReviewSummary;