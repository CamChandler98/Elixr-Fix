import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { csrfFetch } from "../../store/csrf"

const RequestButtonSty = styled.div`
    button{
        width = 60px;
        backgroumd-color: white;
        padding: .5% 3%;
        border-radius: 4px;
        border-style:none;
        margin-top: 6px;
    }
`
const RequestButton = ({userTwoId}) =>{
    const [pending, setPending] = useState(true)
    const [friends, setFriends] = useState(false)

    let userOneId = useSelector(state => state.session.user?.id)
        useEffect(async ()=> {
            let users = {userOneId,userTwoId}
            let res = await csrfFetch('/api/requests/check',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(users)
            })
            let check = await res.json()
            console.log(check)
            if(check === true){
                setPending(true)
            }else{
                setPending(false)
            }
        },[userTwoId])

    const sendRequest = async () =>{
        let users = {userOneId,userTwoId}
        let res = await csrfFetch('/api/requests',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(users)
        })
        if(res.ok){
            setPending(true)
        }
    }
    return (
        <RequestButtonSty>
        <>
        {<button onClick ={!pending ? sendRequest: null}>{pending ? 'Request Pending': 'Send Friend Request'}</button>}
        </>
        </RequestButtonSty>
    )
}

export default RequestButton
