import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import '../LoginFormPage/login.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }else{
    return setErrors(['Confirm Password field must be the same as the Password field']);}
  };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file){
        setImage(file);
        // let tempUrl = URL.createObjectURL(e.target.files[0])
        // setTempImgUrl(tempUrl)
    }
  };

  return (
    <main>
      <div>
    <form onSubmit={handleSubmit} className = 'form-container'>
      <div>
      <h2>Sign Up</h2>
      <label htmlFor = 'profile-pic' className = 'form-group'>
        <input id = 'profile-pic' type = 'file'
          onChange = {updateFile} />
      </label>
      <label className = 'form-group'>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className = 'form-control'
          placeholder = 'Enter email'
          required
          />
      </label>
      </div>
      <div>
      <label className = 'form-group'>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className = 'form-control'
          placeholder = 'Enter username'
          required
        />
      </label>
      </div>
      <label className = 'form-group'>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className = 'form-control'
          placeholder = 'Enter password'
          required
        />
      </label>
      <label className = 'form-group'>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className = 'form-control'
          placeholder = 'Confirm password'
          required
        />
      </label>
      <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
      <button className = 'form-button' type="submit">Sign Up</button>
      <div className = 'form-group'>
      <NavLink to = '/login'>
        <p>Have an account? Log in here</p>
      </NavLink>
      </div>
    </form>
    </div>
    </main>


  );
}

export default SignupFormPage;
