import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goGetFriends } from "../../store/friends"
import { getAllReviews} from "../../store/reviews"
import ReviewDetails from "./ReviewDetails"

const FriendReviews = ({userId}) => {
    const [friendReviews, setFriendReviews] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        if(userId){
            dispatch(goGetFriends(userId))
        }
    },[userId,dispatch])
    let friendState = useSelector(state => state.friends?.friends)
    let friends = Object.values(friendState)
    useEffect(() => {
        dispatch(getAllReviews())
    },[])
    let reviewsSate = useSelector(state => state.reviews)
    let reviews = Object.values(reviewsSate)

    useEffect(() =>{
        for (let friend of friends){

            let id = friend?.userOneId === userId ? friend?.two?.id: friend?.one?.id

            reviews.forEach( review => {

                if(id === review.userId){
                 friendReviews.push(review)
                }

            })}
    },[friendReviews])


    return(
        <>
            {
                friendReviews && friendReviews.map(review => {
                    return(
                        <ReviewDetails key = {review.id} reviewId={review.id}></ReviewDetails>
                    )
                })
            }
        </>
    )
}

export default FriendReviews
