import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../store/reviews"
import ReviewDetails from "./ReviewDetails"
import styled from "styled-components"


let ReviewSty = styled.div`
    .reviews{
        display:flex;
        margin: 15%;
        margin-top: 5%;
        flex-direction: column;
    }
    h1{
        font-size: 30px;
        align-self:center;
        margin-bottom: 20px
    }
`
const LatestReviews = () => {
    let dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getAllReviews())
    },[dispatch])
    let reviewsState = useSelector(state => state.reviews)
    let allReviews = Object.values(reviewsState).reverse()
    // console.log(allReviews)
        return(
            <ReviewSty>
            <div className = 'reviews'>
                <h1>Latest Reviews</h1>
                {allReviews && allReviews.map(review => {
                return (
                    <ReviewDetails key = {review.id} reviewId= {review.id}></ReviewDetails>
                )
             })}
            </div>
            </ReviewSty>
        )
}

export default LatestReviews
