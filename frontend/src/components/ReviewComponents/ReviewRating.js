import reviewIcon from '../DrinkComponents/images/thumbnail/review-potion-icon.svg'
import styled from 'styled-components'


let RatingSty = styled.div`
    .rating-container{
        display: flex;
        align-items: center;
        margin-top:2%
    }
    .icon{
        width:50px;
        margin: -10px;
    }
    .score{
        filter: invert(.5) sepia(1) saturate(3) hue-rotate(205deg);
    }
    .text{
        margin-right: 2%
    }
`
const ReviewRating = ({rating}) =>{
    let normalizedRating = Math.ceil(parseInt(rating))
    let controlArr = [1,2,3,4,5]
    return (
        <>
        <RatingSty>
            <div className = 'rating-container'>
                <span className = 'text'>Rating: </span>
                {controlArr.map( num => {
                    if(num > normalizedRating){
                        return(
                            <img key = {num} alt= 'rating' className = 'icon' src = {reviewIcon}>
                             </img>
                        )
                    }else{
                        return(
                            <img key = {num} alt= 'rating' className = 'icon score' src = {reviewIcon}>
                             </img>
                        )
                    }
                })}
            </div>
        </RatingSty>
        </>
    )
}


export default ReviewRating
