
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import splashImage from '../DrinkComponents/images/thumbnail/logo.svg'

import * as sessionActions from '../../store/session';

let SplashSty =styled.div `
@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
    .container{
        display: flex;
        height:100vh;
    }
    img{
        height:350px;
        width:auto;
        padding-left: 25px;
    }
    .left-side{
        display: flex;
        flex-direction: column;
        align-items:center;
        width:50%;
    }
    .right-side{
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        margin: 0;
        background: rgb(143,69,182);
        background: linear-gradient(330deg, rgba(143,69,182,1) 0%, rgba(169,140,209,1) 100%);
        width:50%;
        height:100vh;

    }

    h1{
        font-size:80px;
    }
    .logo{
        font-family: "Monoton";
    }
    .grey{
        color: grey;
    }
`

let NavSty = styled.div`
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    background-color: white;
    padding: 3%;
    gap:25px;
    width:300px;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);

    a{
        text-decoration: none;
        background-color: #5F1A37;
        color: white;
        padding: 5% 15%;
        border-radius: 5px;
    }
`
let SpalshPage = ({isLoaded}) => {

    let dispatch = useDispatch()

    const demoLogin = () =>{
        let credential = 'Nimue'
        let  password = 'password'


        return dispatch(sessionActions.login({ credential, password }))
    }
    const sessionUser = useSelector(state => state.session.user);

    if(sessionUser){
        return(
            <Redirect to ={`/categories`}/>
        )
    }
    let body = document.body


    body.style.margin = 0
    body.style.height =`100%`



    return(
        <SplashSty>
            {isLoaded &&
            <div className = 'container'>
            <div className = 'left-side'>
            <h1 className = 'logo'>Welcome!</h1>
            <img alt ='splash' src = {splashImage}>
            </img>
            <h1 className = 'logo'>
                Elixr
            </h1>
            <h2 className = 'grey'>
                Explore an Ocean of Potions
            </h2>
            </div>
            <div className = 'right-side'>
                <div className = 'link-container'>
                    <NavSty>
                <span>Login here</span>
                <NavLink to = '/login'>
                    <span>Login</span>
                </NavLink>
                <NavLink  to = '/signup'>
                    <span>Signup</span>
                </NavLink>
                <a onClick = {demoLogin}>Demo</a>
                </NavSty>
                </div>
            </div>
            </div>
        }
        </SplashSty>
    )
}

export default SpalshPage
