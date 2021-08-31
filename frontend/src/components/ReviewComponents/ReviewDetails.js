import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getOneReview } from "../../store/reviews"
import styled from "styled-components"
import ReviewRating from "./ReviewRating"

const ReviewDetailSty = styled.div`

    border-top: 1px solid rgba(128,128,128,0.52);
    border-bottom: 1px solid rgba(128,128,128,0.52);
    display:flex;
    flex-direction: column;
    padding: 50px 0px;

    .review-image{
        display:flex;
        justify-content:center;
        box-shadow:  1px 4px 2px 1px rgb(195 191 191 / 61%);
        padding: 1%
    }
    .user-pic{
        width: 775px;
        height: 200px;
        object-fit: cover;
    }

    .review-details-rating{
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid rgba(128,128,128,0.3);
        border-radius: 7px;
        box-sizing: border-box;
        padding: 10px 15px;
    }
    a{
        text-decoration: none;
        color: rgb(198, 135, 231);
        font-weight: 500;
    }
    a:hover{

        color: rgb(95 44 121);
        font-weight:bold;

    }
    .detail-link{
        margin-top: 15px;
    }
    .profile-pic{
        margin-right: 1.7%;
        width:50px;
        max-height: 50px;
        object-fit: cover;
        border-radius:50%;
        box-shadow:  1px 4px 2px 1px rgb(195 191 191 / 61%);
      }
`
const ReviewDetails = ({reviewId}) => {
    let dispatch = useDispatch()
    // console.log('reviewid',reviewId)
    useEffect(() => {
        if(reviewId){
        dispatch(getOneReview(parseInt(reviewId)))}
    },[reviewId,dispatch])

    let review = useSelector(state => state.reviews[reviewId])

    return(
        <ReviewDetailSty>
            {review &&<>
                       <span className = 'review header'>
                           <img className='profile-pic' src = {review.User.profilePictureUrl}/>
                           <NavLink to = {`/users/${review?.User?.username}`}>{review?.User?.username}</NavLink> is drinking <NavLink to = {`/drinks/${review?.drinkId}`}>{review?.Drink?.name}</NavLink> brewed by <NavLink to ={`/users/${review?.Drink?.User?.username}`}>{review?.Drink?.User?.username}</NavLink> </span>

                       <div className = 'review-details-rating'>
                           <ReviewRating rating = {review.rating}/>
                           <p>{review?.content}</p>
                       </div>
                        {review.imageUrl && <div className = 'review-image'>
                           <img alt = 'user' className ='user-pic' src = {review?.imageUrl}></img>
                       </div>}
                       <div className = 'detail-link'>
                           <NavLink to= {`/reviews/${review.id}`}>view detailed review</NavLink>
                       </div>
            </>
            }
                       </ReviewDetailSty>
    )
}

export default ReviewDetails
