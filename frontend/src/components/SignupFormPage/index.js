import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";
import * as sessionActions from "../../store/session";
import profilePlaceholder from '../DrinkComponents/images/thumbnail/upload-profile-pic.svg'
import removeIcon from '../DrinkComponents/images/thumbnail/remove-icon.svg'
import '../LoginFormPage/login.css'

const ImageSty = styled.div`
margin: 0 auto;
img{
  margin:2%;
  width:90px;
  height: 90px;
  object-fit: cover;
}

input[type="file"]{
  display: none;
  margin:0;
}

.profile-pic{
  border-radius: 50%;
  margin-left: 25px;
  object-fit: cover;

}
.remove{
  position: relative;
  height: 30px;
  width:30px;
  margin:0;
  bottom:25px;
  right:-70px;
`

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null)
  const [tempImgUrl, setTempImgUrl] = useState('')
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, image }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }else{
    return setErrors(['Confirm Password field must be the same as the Password field']);}
  };
  const updateFile = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    if (file){
        setImage(file);
        let tempUrl = URL.createObjectURL(e.target.files[0])
        setTempImgUrl(tempUrl)
    }
  };
  const removeImage = (e) => {
    e.preventDefault()
   URL.revokeObjectURL(tempImgUrl)
   setImage(null)
   setTempImgUrl('')
}

  return (
    <main>
      <div>
    <form onSubmit={handleSubmit} className = 'form-container'>
      <div>
      <h2>Sign Up</h2>
      <label htmlFor = 'profile-pic' className = 'form-group'>
        <ImageSty>
        <input id = 'profile-pic' type = 'file'
          onChange = {updateFile}/>
          <img
            src = {tempImgUrl ? tempImgUrl: profilePlaceholder}
            className = {tempImgUrl ? 'profile-pic': 'placeholder'}
            alt = 'submit-photo'
          />
          {
            tempImgUrl && <img src = {removeIcon} alt = 'remove profile'
              onClick ={ removeImage}
              className = 'remove'
            />
          }
          </ImageSty>

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
