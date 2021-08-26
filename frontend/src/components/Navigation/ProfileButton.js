import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileMenu from "./ProfileMenu";
import faceButton from '../DrinkComponents/images/thumbnail/profile-icon.svg'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

const ProfileButtonSty = styled.div`
  img{
    height: 60px;
    margin-top: 10px;
    border-radius: 50%;
  }
  img:hover{
    cursor: pointer;
    transform: scale(1.07);
  }
`

let ProfileButton = () => {
    let history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const profilePictureUrl = useSelector(state => state?.session.user.profilePictureUrl)
      console.log('url',profilePictureUrl)
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')

    }
    return(
      <ProfileButtonSty>
        <>
        {profilePictureUrl && <img src ={profilePictureUrl} alt = 'profile' onClick = {openMenu}/>}
        {showMenu && <ProfileMenu logout = {logout} />}
        </>
        </ProfileButtonSty>
    )
}

export default ProfileButton
