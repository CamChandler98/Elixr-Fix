
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriendRequests } from "../../store/friends"
import AcceptRequestButton from "./AcceptRequestButton"
import styled from 'styled-components'
import { NavLink} from 'react-router-dom'
import DenyRequestButton from "./DenyRequestButton"

const RequestSty = styled.div`
    margin-top: 7%;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    font-size: 20px;

    h1{
        font-size: 20px;
        margin-bottom: 2%;

    }
    .request-container{
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    a{
        text-decoration: none;
        color: rgb(198, 135, 231);
        font-weight: 500;
    }
    a:hover{

        color: rgb(95 44 121);
        font-weight:bold;

    }
    .request-and-buttons{
        display: flex;
        gap: 25px;
        align-items:center;
        background-color: #f6f1f7;
        width: 300px;
        padding: 4%;
        border-radius: 7px;

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
                <span>Request from <NavLink to = {`/users/${request?.sender?.username}`}>{request?.sender?.username}</NavLink></span>
                <div className = 'buttons'>
                <AcceptRequestButton request = {request} />
                <DenyRequestButton request = {request} />
                </div>
                </div>)
            })}
        </div>
        </RequestSty>
    )
}
export default RequestPage
