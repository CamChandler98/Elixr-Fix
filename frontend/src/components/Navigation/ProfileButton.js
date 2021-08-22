import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileMenu from "./ProfileMenu";
import faceButton from '../DrinkComponents/images/thumbnail/profile-icon.svg'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

const ProfileButtonSty = styled.div`
  img{
    height: 60px;
    margin-top: 10px
  }
  img:hover{
    cursor: pointer;
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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')

    }
    return(
      <ProfileButtonSty>
        <>
        <img src ={faceButton} alt = 'profile' onClick = {openMenu}/>
        {showMenu && <ProfileMenu logout = {logout} />}
        </>
        </ProfileButtonSty>
    )
}

export default ProfileButton
