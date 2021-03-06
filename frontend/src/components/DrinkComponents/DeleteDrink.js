import { useDispatch } from "react-redux"

import styled from "styled-components"
import { deleteDrink } from "../../store/drinks"



let DeleteDrinkSty = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Raleway:wght@300;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Charmonman:wght@400;700&family=Cookie&family=Mystery+Quest&display=swap');
    .container{
        display:flex;
        flex-direction:column;
        align-items: center;
        gap:25px;
        padding:5%;

    h1{
        font-size: 30px;
        text-align:center;
        font-weight: bold;
        font-family: "Raleway";
    }
    button {
        border: none;
        background-color: rgb(216 73 171);
        font-size: 30px;
        color:#fff;
        padding: 2% 5%;
        border-radius: 5px;
        font-family: "Lato";

    }

`
let DeleteDrink = ({drinkId , closeModal}) =>{
    let dispatch = useDispatch()

    let handleSubmit = () =>{
        dispatch(deleteDrink(drinkId))
        closeModal()
    }


    return(
        <DeleteDrinkSty>
        <div className ='container'>
            <h1>
                Are you sure? You can not go back
            </h1>
            <button className = "delete"onClick = {handleSubmit}>Delete</button>
        </div>
        </DeleteDrinkSty>
    )
}
export default DeleteDrink
