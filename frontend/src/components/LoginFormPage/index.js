import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import './login.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to={`/users/${sessionUser.username}`} />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <main>
    <div>
    <form onSubmit={handleSubmit}
    className = 'form-container'>
      <div >
        <h2>Welcome Back</h2>
      <label className = 'form-group' >
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder = {`Enter username or email`}
          required
          className = 'form-control'
          />
      </label>
      </div>
      <div>
      <label className = 'form-group' >
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className = 'form-control'
          placeholder = {`Password`}
          />
      </label>
      </div>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
      <button className = 'form-button' type="submit">Log In</button>
      <div className = 'form-group'>
      <NavLink to = '/signup'>
        <p>Don't have an account? Sign up here?</p>
      </NavLink>
      </div>
    </form>
    </div>
    </main>
  );
}

export default LoginFormPage;
