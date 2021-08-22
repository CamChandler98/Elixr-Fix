// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// // import { current } from "../../store/drinks"
// import { getDrinkReviews} from "../../store/reviews"
import ReviewDetails from "./ReviewDetails"
const DrinkReviews = ({reviews}) => {
    // const dispatch = useDispatch()
    // console.log(reviews)
    // let {drinkId} = useParams()

    // let reviews = useSelector(state => state.reviews)
    // useEffect(() => {
    //     dispatch(getDrinkReviews(drinkId))
    // },[])

    return(
        <div>
            {reviews && reviews.map(review => {
                return (
                    <ReviewDetails key = {review.id} reviewId= {review.id}></ReviewDetails>
                )
            })}
        </div>

    )
}
export default DrinkReviews
