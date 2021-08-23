import { useDispatch } from "react-redux"
import styled from "styled-components"

const { makeFriend, deleteOneReq} = require("../../store/friends")

const ButtonSty = styled.div`
button{
    background-color: rgb(198, 135, 231);
    color: white;
    border:none;
    padding: 6% 10%;
    margin-top: 5px;
    border-radius: 3px;
    font-size: 16px;


}
button:hover{
    cursor: pointer;
    background-color: rgb(144 91 173);
}
`

const AcceptRequestButton = ({request}) => {
    const dispatch = useDispatch()
    let userOneId = request.sender.id
    let userTwoId = request.reciever.id

    let handleClick = () => {
        dispatch(makeFriend({userOneId,userTwoId}))
        dispatch(deleteOneReq(request.id))
    }

    return(
        <ButtonSty>
        <button onClick = {handleClick}>Accept</button>
        </ButtonSty>
    )

}

export default AcceptRequestButton
