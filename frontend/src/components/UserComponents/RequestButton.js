import { useEffect, useState } from "react"
import {  useSelector } from "react-redux"
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
const RequestButton = ({userTwoId, friends}) =>{
    const [pending, setPending] = useState(null)

    let userOneId = useSelector(state => state.session.user?.id)

        useEffect(()=> {
            let users = {userOneId,userTwoId}
            async function fetchData(){

                let res = await csrfFetch('/api/requests/check',{
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(users)
                })
                let check = await res.json()

                if(check === true){
                    setPending(true)
                }else{
                    setPending(false)
                }
            }
            fetchData()
            return (setPending(null))
        },[userTwoId, userOneId])

    const sendRequest = async () =>{
        let users = {userOneId,userTwoId}
        async function fetchData(){

            let res = await csrfFetch('/api/requests',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(users)
            })
            if(res.ok){
                setPending(true)
            }
        }
        fetchData()
    }
    return (
        <RequestButtonSty>
        <>
        {userOneId && userTwoId && friends !== undefined && <button onClick ={pending === false ? sendRequest: null}>{pending === true? 'Request Pending': friends === true ? 'Congrats! Friends!': 'Send Request'}</button>}
        </>
        </RequestButtonSty>
    )
}

export default RequestButton
