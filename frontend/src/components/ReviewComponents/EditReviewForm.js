import { useEffect, useState } from "react"
import ReactSlider from "react-slider"
import { useDispatch, useSelector } from "react-redux"
import {  editReview } from "../../store/reviews"
import styled from "styled-components"
import { getOneDrink } from "../../store/drinks"
// import cameraButton from '../DrinkComponents/images/thumbnail/photo-button.svg'
// import { Redirect } from "react-router-dom"

const EditReviewSty = styled.div`
h2{
    color: rgb(49 45 45 / 69%)
}
form{
    display: flex;
    flex-direction: column;
    align-items:center;
    padding:25px;
    margin:1%;
    gap: 25px;
}
.content-photo{
    display:flex;
    gap:15px
}
input[type="file"]{
    display: none;
}
img{
    margin: 2%;
    width:90px;
    max-height: 90px;
    object-fit: cover;
}
.remove{
    width:90px;
    margin: 2%;

}
.submit{
    width: 50%;
    height: 30px;
    border-radius: 8px;
    border: 0px;
    background-color:  rgb(198, 135, 231);
    color: #fff;
    font-weight: 500;
}
.rating-container{
    display:flex;
    gap:10px;
}

.rating-container label{
    font-weight: bold;
    align-self: center;
    font-size: 20px;
    color: rgb(49 45 45 / 69%);
}
textarea{
    resize:none;
    border-color:  rgba(128, 128, 128, 1);
    background: transparent;
    padding: 5%;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
}
`

const ReviewSliderSty = styled.div`

  .rating-thumb {
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    background-color:rgb(63 51 70);
    color: #fff;
    border-radius: 50%;
    top: -2px;
    cursor: grab;
  }
  .rating-slider {
    width: 200px;
    height: 5px;
  }


  .rating-track {
    background: ${props => (props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#ddd')};
    border-radius: 999px;
    height:30px;
    top: -2px;
    bottom: 0;
  }

  .rating-track.rating-track-0 {
    background: rgb(198, 135, 231);
  }

  .slider-container{
    resize: horizontal;

    width: 500px
    max-width: 100%;
    padding-right: 8px;
  }


`
const EditReviewForm = ({review ,drinkId , closeModal}) =>{
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getOneDrink(drinkId))
    },[dispatch,drinkId])

    let drink = useSelector(state => state.drinks[drinkId])
    const [content, setContent] = useState(review?.content)
    const [rating , setRating] = useState(review?.rating)
    const userId = useSelector(state => state.session.user.id)

      const handleSubmit = async (e) =>{
          e.preventDefault()
            dispatch(editReview({id: review?.id,content,rating,userId,drinkId}))
            setContent('')
            setRating(1)
            closeModal()
      }


    return(
        <div>
            <EditReviewSty>
            <form onSubmit={handleSubmit}>
                <h2>Edit {drink?.name} Review</h2>
                <div className= 'content-photo'>
                    <label htmlFor = 'review-content'></label>
                    <textarea
                        id = 'review-content'
                        cols = '30'
                        rows ='5'
                        onChange= {e => setContent(e.target.value)}
                        placeholder = 'Let the world know how you feel'
                        value = {content}
                    >
                    </textarea>
                    </div>
                <div className ='rating-container'>
                    <label htmlFor = "rating">
                       Changed your Mind?
                    </label>
                    <ReviewSliderSty>
                        <div className = 'slider-container'>
                    <ReactSlider
                        className="rating-slider"
                        marks
                        markClassName="rating-mark"
                        min={1}
                        max={5}
                        thumbClassName="rating-thumb"
                        trackClassName="rating-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        renderTrack={(props, state) => (
                            <div {...props} index={state.index}></div>
                          )}
                          pearling

                          value = {rating}
                          onAfterChange = { val => {setRating(val)}}
                    />
                        </div>
                    </ReviewSliderSty>
                </div>
                <button className= 'submit' type = 'submit'>Confirm</button>
            </form>
            </EditReviewSty>
        </div>
    )
}

export default EditReviewForm
