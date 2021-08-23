import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { goGetFriends } from "../../store/friends"

const FriendSty = styled.div`
    display:flex;
    flex-direction:column;
    margin:5%;

    h1{
        font-size:50px;
        margin-bottom: 20px;
    }

    .list{
        display:flex;
        flex-direction:column;
        gap:20px;
    }
    .list a{
        font-size: 20px;
        text-decoration: none;
    }

    a:hover{
        transform: scale(1.01);
        color: rgba(169,140,209,1);
    }

`

const FriendsList = () => {
    const dispatch = useDispatch()
    let userId = useSelector(state => state.session.user?.id)

    useEffect(()=>{
        if(userId){
            dispatch(goGetFriends(userId))
        }
    },[userId,dispatch])
    let friendState = useSelector(state => state.friends?.friends)
    let friends = Object.values(friendState)
    console.log(friends)

    return(

        <FriendSty>
            {friends &&
            <>
            <h1>Your Friends</h1>
            <div className = 'list'>
                {friends.map( friend => {
                    let name = friend.userOneId === userId ? friend.two.username: friend.one.username
                   return( <div key = {friend.id}>
                        <NavLink to = {`/users/${name}`}>
                            {name}
                        </NavLink>
                    </div>)
                })}
            </div>
            </>
            }
            </FriendSty>
    )
}

export default FriendsList
