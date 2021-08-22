


import styled from 'styled-components'
import DrinkDetailStyled from './DrinkOwnedDetails'
const { useEffect } = require("react")
const { useSelector, useDispatch } = require("react-redux")

const { getOneDrink } = require("../../../store/drinks")

let DetailsSty = styled.div`
.drink-details-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: .3px solid rgba(141, 141, 141, 0.582);
    box-sizing: border-box;
    padding-left: 60px;
    margin-left: 20px
}

.drink-details{
    margin: 0px 0px 0px 10px;
    background-color:white;
    padding: 1%;
    display: flex;
    border-bottom: 1px solid rgba(128, 128, 128, 0.692) ;
    border-top: 1px solid rgba(128, 128, 128, 0.692);
    box-sizing: border-box;

}
.link-text{
    text-decoration:none;
}
.link-text:hover{
    transform: scale(1.01);
    color: rgba(169,140,209,1);
}
`
const DrinkDetailsUnstyled = ({drinkId}) =>{
    let dispatch = useDispatch()

    useEffect(()=>{
        if(drinkId){
        dispatch(getOneDrink(parseInt(drinkId)))}
    },[dispatch,drinkId])

    let drink = useSelector(state => state.drinks[drinkId])

    return (
        <>
       {drink && <div className = 'drink-details'>
                <DrinkDetailStyled drink = {drink}></DrinkDetailStyled>
            <div className = 'drink-details-right'>
                <span className= 'total-ratings'>Total ratings: {drink?.count}</span>
                <span className = 'average-rating'>Average rating: {drink?.avg}</span>
            </div>
        </div>}
        </>
    )
}

const DrinkDetails = ({drinkId}) =>{
    return(
    <DetailsSty>
        <DrinkDetailsUnstyled drinkId = {drinkId}/>
    </DetailsSty>)
}

export default DrinkDetails
