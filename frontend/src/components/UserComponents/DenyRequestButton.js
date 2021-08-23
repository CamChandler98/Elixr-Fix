import { useDispatch } from "react-redux"
import styled from "styled-components"

const {  deleteOneReq} = require("../../store/friends")

const ButtonSty = styled.div`
button{
    background-color: rgb(216 73 171);
    color: white;
    border:none;
    padding: 6% 10%;
    margin-top: 5px;
    border-radius: 3px;
    font-size: 16px;
    margin-right: 21px;
    width: 70px;


}
button:hover{
    cursor: pointer;
    background-color: rgb(144 91 173);
}
`

const DenyRequestButton = ({request}) => {
    const dispatch = useDispatch()
    let handleClick = () => {

        dispatch(deleteOneReq(request.id))
    }

    return(
        <ButtonSty>
        <button onClick = {handleClick}>Deny</button>
        </ButtonSty>
    )

}

export default DenyRequestButton
