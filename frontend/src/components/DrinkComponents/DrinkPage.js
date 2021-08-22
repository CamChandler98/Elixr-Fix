import { useParams} from "react-router-dom"
import styled from "styled-components"
import DrinkReviews from "../ReviewComponents/DrinkReviews"
import DrinkDetails from "./DrinkDetailComponents/DrinkDetails"
import ReviewFormModal from "../ReviewComponents/ReviewFormModal"

const { useEffect } = require("react")
const { useSelector, useDispatch } = require("react-redux")

const { getOneDrink } = require("../../store/drinks")
const {getDrinkReviews} = require('../../store/reviews')

let DrinkPageDetailsSty = styled.div`
    h2{
        font-size: 30px;
        font-weight: 400;

    }
    span{

    }
    a{
        text-decoration: none
    }
    img{
        width:120
        px;
    }
    h3{
        margin: 2% 0;
        font-size: 17px;
    }
    span{
        font-size: 20px;
        margin: 2% 0;
    }
    `

    let DrinkPageSty = styled.div`
    .drink-page{
        margin: 3% 10%;
        display: flex;
        flex-direction: column;
        max-width: 800px;
    }

        .drink-description{
            margin-left: 1.1%;
            border-bottom: 1px solid rgba(128,128,128,0.692);
            box-sizing: border-box;
            display:flex;
            align-items: center;
            padding: 20px 5px;
            gap:2%;
        }

        .drink-description > p {
            margin-left: 2%;
            font-size:16px;
        }

        .review-button{
            width: 70px;
            transform: rotate(10deg)
        }

        .reviews{
            display: flex;
            margin-top: 10%
        }
`


const DrinkPage = () =>{
    let {drinkId} = useParams()

    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getOneDrink(parseInt(drinkId)))

    },[dispatch,drinkId])
    useEffect(()=>{

        dispatch(getDrinkReviews(drinkId))

    },[dispatch,drinkId])


    let drink = useSelector(state => state.drinks[drinkId])
    let reviewsState = useSelector(state => state.reviews)

    let allReviews = Object.values(reviewsState)
    let reviews = allReviews.filter( review => review.drinkId === + drinkId).reverse()
    return (
        <DrinkPageSty>
        <div className = 'drink-page'>
        <div className = 'drink-details'>
            <DrinkPageDetailsSty> <DrinkDetails drinkId = {drinkId}/></DrinkPageDetailsSty>
        </div>
        <div className = 'drink-description'>
            <p>{drink?.description}</p>
            <ReviewFormModal drinkId = {drinkId}/>
        </div>
        <div className = 'reviews'>
        {reviews && <DrinkReviews reviews = {reviews} />}

        </div>
        </div>
        </DrinkPageSty>

    )
}

export default DrinkPage
