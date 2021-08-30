import styled from 'styled-components'
import githublogo from '../DrinkComponents/images/thumbnail/github-logo.png'

const AboutSty = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 5%;
    h1{
        font-size: 40px;
        margin-bottom: 50px;
    }
    h2{
        margin-bottom: 20px;
    }
    .site-link{
        display: flex;
        flex-direction: column;
        align-items:center;
        text-align: center
    }
    p{
        font-size: 20px;
        font-weight: bold;
    }
    a{
        text-decoration: none;
    }
    a:hover{
      color:  rgb(117 66 144);
    }
`
const AboutPage = () =>{

    return(
        <AboutSty>
            <h1>Developed by Cam Chandler</h1>
            <h2>Contact me</h2>
            <div className = 'links'>
                <div className = 'site-link'>
                <a href = 'https://github.com/CamChandler98'><img src = {githublogo} alt = 'github' ></img> <p>GitHub</p></a>
                </div>
            </div>
        </AboutSty>
    )

}

export default AboutPage
