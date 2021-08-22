import { csrfFetch } from './csrf';

const LOAD = 'reviews/load'
const ADD = 'reviews/add'
const REMOVE ='reviews/remove'
const USER = 'reviews/user'
const DRINK = 'reviews/drink'

// const drink = (drinkReviews) => ({
//     type: DRINK,
//     drinkReviews
// })

const user = (userReviews) => ({
    type: USER,
    userReviews
})
const remove = (reviewId) =>({
    type: REMOVE,
    reviewId
})
const add = review => ({
    type: ADD,
    review
})

const load = reviewList => ({
    type: LOAD,
    reviewList
})

export const getAllReviews = () => async (dispatch) =>{
    let res = await fetch(`/api/reviews`)
    let reviewList = await res.json()

    dispatch(load(reviewList))
    return
}
export const removeReview = (reviewId) => async (dispatch) => {
    await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'delete'
    })



    dispatch(remove(reviewId))
    return
}

export const addReview = (review) => async (dispatch) => {
    const {image, userId , drinkId, rating, content} = review

    const formData = new FormData()

    formData.append('userId',userId)
    formData.append('drinkId', drinkId)
    formData.append('rating',rating)
    formData.append('content',content)
    if(image) formData.append("image",image)

    const res = await csrfFetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const newReview = await res.json();
      dispatch(add(newReview));
      return


}
export const editReview = (review) => async (dispatch) => {
    const {image, rating, content, removeImg, } = review

    const formData = new FormData()


    formData.append('rating',rating)
    formData.append('content',content)
    formData.append('removeImg', removeImg)

    if(image) formData.append("image",image)

    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const updatedReview = await res.json();
      dispatch(add(updatedReview));
      return
}

export const getDrinkReviews = (drinkId) => async (dispatch) =>{
    const res = await fetch(`/api/reviews/drinks/${drinkId}`)
    if(res.ok){
        const reviewList = await res.json()
        dispatch(load(reviewList))
    }
    return
}

export const getUserReviews = (userId) => async (dispatch) =>{
    const res = await fetch(`/api/reviews/users/${userId}`)
    if(res.ok){
        const reviewList = await res.json()
        dispatch(user(reviewList))
    }
    return
}

export const getOneReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`)

    if(res.ok){
        const review = await res.json(
        )
        dispatch(add(review))
    }
}

const reviewReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD:{
            let reviews = action.reviewList.reduce((accum,review) => {
                accum[review.id] = review
                return accum
            },{})
            return{
                ...state,
                ...reviews
            }
        }
        case ADD: {
            if(!action.review){return ({...state})}
            if(!state[action.review.id]){
                return{
                    ...state,
                    [action.review.id] : action.review,
                }
            }else{
                return{
                    ...state,
                    [action.review.id]: {
                        ...state[action.review.id],
                        ...action.review
                    }
                }
            }
        }
        case REMOVE:{
            let newState = {...state}

            delete newState[action.reviewId]

            return {...newState}
        }
        case USER :{
            let newState = {...state}
            newState.userReviews = action.userReviews
            return {...newState}
        }
        case DRINK: {
            let newState = {...state}
            newState.drinkReviews = action.drinkReviews
            return {...newState}
        }
        default:
            return state
        }
    }


export default reviewReducer
