
import ReviewDetails from "./ReviewDetails"
const UserReviews = ({reviews}) => {
    return(
        <div>
            {reviews && reviews.map(review => {
                return (
                    <ReviewDetails key = {review.id} reviewId={review.id}></ReviewDetails>
                )
            })}
        </div>
    )
}
export default UserReviews
