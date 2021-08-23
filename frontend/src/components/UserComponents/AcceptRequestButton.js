import { useDispatch } from "react-redux"

const { makeFriend, deleteOneReq} = require("../../store/friends")

const AcceptRequestButton = ({request}) => {
    const dispatch = useDispatch()
    let userOneId = request.sender.id
    let userTwoId = request.reciever.id

    let handleClick = () => {
        dispatch(makeFriend({userOneId,userTwoId}))
        dispatch(deleteOneReq(request.id))
    }

    return(
        <>
        <button onClick = {handleClick}>Accept</button>
        </>
    )

}

export default AcceptRequestButton
