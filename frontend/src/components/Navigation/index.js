import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let buttonCheck
  if (sessionUser) {
    buttonCheck = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <header>
    <div className = 'left-side'>
    <ul className = 'nav-links'>
        <NavLink exact to="/">
          <h2> Elixr</h2>
          </NavLink>
      <li>
        {isLoaded && sessionLinks}
        <NavLink to = '/thecoven'>
          The Coven
        </NavLink>
        <NavLink to = '/categories'>
            Categories
        </NavLink>
      </li>
    </ul>
    </div>
    <div className = 'right-side'>
    {isLoaded && buttonCheck}

    </div>
    </header>
  );
}

export default Navigation;
