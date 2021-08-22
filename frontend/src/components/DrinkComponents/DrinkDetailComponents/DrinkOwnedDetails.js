import styled from 'styled-components'
// import './DrinkDetails.css'
// const { useEffect } = require("react")
// const { useSelector, useDispatch } = require("react-redux")
import { thumbImages } from '../image-handler'
const { NavLink } = require("react-router-dom")
// const { getOneDrink } = require("../../../store/drinks")


let OwnedSty = styled.div`
    .drink-detail{
        display:flex;
        align-items: center;
        margin-right: 150px;
        width: 300px;
        box-sizing: border-box;
    }
    img{
        width: 90px;
        height: auto;
    }
    h2{
        font-size: 16px;
    }
    .link-text{
        text-decoration:none;
    }
    .link-text:hover{
        transform: scale(1.01);
        color: rgba(169,140,209,1);
    }
`
const DrinkTextDetails = ({drink}) =>{

    return (
                <div className = 'drink-detail'>
                    <img src = {thumbImages[drink?.categoryId]} alt ={`${drink?.Category.name} thumbnail`}></img>
                    <div className = 'text-details'>
                    <NavLink className = 'link-text' to = {`/drinks/${drink?.id}`}>
                    <h2 className = 'link-text'>{drink?.name}</h2>
                    </NavLink>
                    <NavLink className = 'link-text'to = {`/users/${drink?.User.username}`}>
                    <h3 className = 'link-text'>by {drink?.User.username}</h3>
                    </NavLink>
                    <NavLink className = 'link-text' to ={`/categories/${drink?.Category.id}/${drink?.Category.name}`}>
                    <h3 className = 'link-text'>{drink?.Category.name}</h3>
                    </NavLink>
                    </div>
                </div>
    )
}

const DrinkDetailStyled = ({drink}) => {
    return(
        <OwnedSty>
            <DrinkTextDetails drink = {drink}/>
        </OwnedSty>
    )
}

export default DrinkDetailStyled
