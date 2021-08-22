import { useDispatch } from "react-redux"
import {  useHistory } from "react-router-dom"
import styled from "styled-components"
import { removeReview } from "../../store/reviews"


let DeleteSty = styled.div`
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
let DeleteReview = ({reviewId , closeModal}) =>{
    let dispatch = useDispatch()
    let history = useHistory()
    let handleSubmit = () =>{
        dispatch(removeReview(reviewId))
        closeModal()
        return history.goBack()
        // return  (<Redirect to = {'/categories'}/>)
    }


    return(
        <DeleteSty>
        <div className ='container'>
            <h1>
                Are you sure? You can not go back
            </h1>
            <button className = "delete"onClick = {handleSubmit}>Delete</button>
        </div>
        </DeleteSty>
    )
}
export default DeleteReview
