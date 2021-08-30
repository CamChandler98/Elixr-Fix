import { NavLink, useParams } from "react-router-dom"
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getOneReview } from "../../store/reviews"
import DrinkDetailStyled from "../DrinkComponents/DrinkDetailComponents/DrinkOwnedDetails"
import { getOneDrink } from "../../store/drinks"
import ReviewRating from "./ReviewRating"
import './ReviewPage.css'
import EditReviewFormModal from "./EditReviewModal"
import DeleteReviewModal from "./DeleteReviewModal"


const ReviewPageSty = styled.div`
        width:100%;
        background-color: #fbf6f0;
        height: 100vh;
        margin:0;
        position:fixed;

    .full-review{
        display: flex;
        margin: 5% 20%;
        gap: 30px;
    }

    .review-image img{
        height: 500px;
        max-width: 400px;
        object-fit: scale-down;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
    }

    .review-content{
        background-color: white;
        display:flex;
        flex-direction: column;
        height: fit-content;
        padding-bottom:40px;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);

    }
    h1{
        font-size: 25px;
        padding-top: 20px;
        text-justify:center;
    }
    .review-bottom{
        padding: 25px;
        border-bottom: 1px solid #bbb9bb
    }
    .buttons{
        display: flex;
        gap:20px;
        padding-top:12px;
    }
    button:hover{
        cursor: pointer;
    }
    a{
        text-decoration:none;
    }
    a:hover{
        transform: scale(1.01);
    }
    .review-top{
        display:flex;
        border-bottom: 1px solid #bbb9bb;
        padding:25px;
        align-items:center;
    }
    .review-top > img{
        margin-right: 1.7%;
        width:60px;
        max-height: 60px;
        object-fit: cover;
        border-radius:50%;
        box-shadow:  1px 4px 2px 1px rgb(195 191 191 / 61%);

    }

`


const ReviewPage = () =>{

    const dispatch = useDispatch()
    let {reviewId} = useParams()
    let [owner,setOwner] = useState(false)

    let userId = useSelector(state => state.session.user?.id)

    useEffect(()=>{
        if(reviewId){
        dispatch(getOneReview(reviewId))}
    },[dispatch,reviewId])

    let review = useSelector(state => state.reviews[reviewId])

    useEffect(()=>{
        if(review){
            dispatch(getOneDrink(review?.drinkId))}
        },[review?.drinkId,review,dispatch])

        useEffect(()=> {
            if(userId && review?.userId === userId){
                setOwner(true)
            }else{

            }
        },[review, userId])

    let drink = useSelector(state => state.drinks[review?.drinkId])

    return(

        <ReviewPageSty>
        <div className = 'test'>
            {review &&
                <div className = 'full-review'>
                <div className = 'review-content'>
                    <NavLink className = 'review-top' to = {`/users/${review?.User?.username}`}>
                    <img src = {review.User.profilePictureUrl}/>
                    <h1>{review?.User?.username}</h1>
                    </NavLink>
                <div className = 'review-bottom'>
                {drink && <DrinkDetailStyled drink = {drink}></DrinkDetailStyled>}
                <p>{review?.content}</p>
                <ReviewRating rating = {review?.rating}/>
                <div className= "buttons">
                {owner && <EditReviewFormModal drinkId = {drink?.id} review = {review} />}
                {owner && <DeleteReviewModal reviewId = {review?.id}></DeleteReviewModal>}
                </div>
                </div>
                </div>
                <div className =' review-image'>
                {review?.imageUrl && <img alt= 'review' src = {review?.imageUrl}/>}
                </div>
                </div>
            }
        </div>
        </ReviewPageSty>
    )



}

export default ReviewPage
