const { makeFriend } = require("../../store/friends")

const AcceptRequestButton = ({request}) => {
    const dispatch = require(dispatch)
    let userOneId = request.sender.id
    let userTwoId = request.reciever.id

    let handleClick = () => {
        dispatch(makeFriend({userOneId,userTwoId}))
    }

    
}
