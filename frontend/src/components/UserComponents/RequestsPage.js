
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriendRequests } from "../../store/friends"

const RequestPage = () =>{
    const dispatch = useDispatch()
    let userId = useSelector(state => state.session.user?.id)

    useEffect(()=>{
        if(userId){
            dispatch(getFriendRequests(userId))
        }
    },[])

    let requestState = useSelector(state => state.friends?.requests)

    let requests = Object.values(requestState)
    console.log(requests)

    return (
        <>
        <h1>Friend Requests</h1>
        <div className = 'request-container'>
            {requests && requests.map( request => {
                return(
                <>
                <span>Request from {request?.sender?.username}</span>
                </>)
            })}
        </div>
        </>
    )
}
export default RequestPage
