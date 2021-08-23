
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriendRequests } from "../../store/friends"
import AcceptRequestButton from "./AcceptRequestButton"
import styled from 'styled-components'

const RequestSty = styled.div`
    margin-top: 7%;

    display: flex;
    flex-direction: column;
    align-items:center;

    h1{
        font-size: 20px;
        margin-bottom: 2%;
    }
    .request-container{
        display: flex;
        flex-direction: column;
    }
`

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
        <RequestSty>
        <h1>Friend Requests</h1>
        <div className = 'request-container'>
            {requests && requests.map( request => {
                return(
                <div className = 'request-and-buttons'>
                <span>Request from {request?.sender?.username}</span>
                <AcceptRequestButton request = {request} />
                </div>)
            })}
        </div>
        </RequestSty>
    )
}
export default RequestPage
