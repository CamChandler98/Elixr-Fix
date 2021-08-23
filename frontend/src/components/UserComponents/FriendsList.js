import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goGetFriends } from "../../store/friends"

const FriendsList = () => {
    const dispatch = useDispatch()
    let userId = useSelector(state => state.session.user?.id)

    useEffect(()=>{
        if(userId){
            dispatch(goGetFriends(userId))
        }
    },[userId,dispatch])
    let friends = useSelector(state => state.friends?.friends)

    console.log(friends)

    return(
        null
    )
}

export default FriendsList
