import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
// import ProfileButton from "./ProfileButton"

let ProfileMenuSty = styled.div`
    position: absolute;
    right: 4.5%;
    background-color: rgb(47, 53, 59);
    padding: 2%;
    box-shadow:box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
    color:white;


    ul{
        display:flex;
        flex-direction:column;
        gap: 10px;
        color:white;

    }
    a{
        color:white;
    }
    a:hover{
        color: rgba(169,140,209,1);
    }
    .welcome{
        font-size: 18px;
    }
`

const ProfileMenu = ({logout}) => {
    const sessionUser = useSelector(state => state.session.user)
    return(
        <ProfileMenuSty>
        <>
        <ul>
            <li className = 'welcome'>
                Welcome, {sessionUser?.username}
            </li>
            <li>
                <NavLink to = {`/users/${sessionUser?.username}`}>
                My Profile
                </NavLink>
            </li>
            <li onClick = {logout}>
                Logout
            </li>
        </ul>
        </>
        </ProfileMenuSty>
    )
}
export default ProfileMenu
