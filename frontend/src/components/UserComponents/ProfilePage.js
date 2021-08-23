import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDrinks } from "../../store/drinks"
import { getUser } from "../../store/profile"
import { getUserReviews } from "../../store/reviews"
import DrinkDetails from "../DrinkComponents/DrinkDetailComponents/DrinkDetails"
import UserReviews from '../ReviewComponents/UserReviews'
import styled from "styled-components"
import DrinkFormModal from "../DrinkComponents/AddDrinkFormModal"
import EditDrinkFormModal from "../DrinkComponents/EditDrinkModal"
import DeleteDrinkModal from "../DrinkComponents/DeleteDrinkModal"
import RequestButton from "./RequestButton"
import { csrfFetch } from "../../store/csrf"
import RequestPage from "./RequestsPage"
import FriendReviews from "../ReviewComponents/FriendReviews"

let ProfileSty = styled.div`
    .main-content{
        display: flex;
        flex-direction: column;
        margin: 3% 10%;
        max-width: 800px;
    }
    .heading{
        font-size: 30px;
        font-weight: bold;
        color: #fff;

    }
    h3{
        margin: .5% 0;
        font-size: 16px;
    }

    .profile-header{
        background: rgb(143,69,182);
        background: linear-gradient(180deg, rgba(143,69,182,1) 0%, rgba(169,140,209,1) 100%);
        color: #fff;
        padding: 3% 7%;
        display:flex;
        flex-direction: column;
        gap: -50px;
        margin-bottom: 15px
    }
    .focus-content{
        display: flex;
        flex-direction: column;
        max-width: 800px
    }
    .switch-bar{
        display: flex;
        height: 50px;
        align-items:center;
        gap: 15px;
        cursor: pointer
    }
    .focused{
        color: rgb(117 66 144);
        font-weight: bold;
    }
    .drink-stuff{
        display: flex;
        gap: 30px;
    }
    .drink-buttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 30px;
    }
`

const ProfilePage = () => {
    const [focus, setFocus] = useState('user')
    let [owner,setOwner] = useState(false)
    let [friends, setFriends] = useState(undefined)
    let {username} = useParams()

    const switchFocus = (target,e) =>{
        if( focus === target) return

        let barItems = document.querySelectorAll('.bar-item')

        for( let item of barItems){
            item.classList.remove('focused')
        }
        e.target.classList.add('focused')

        switch (target) {
            case 'user':
                setFocus('user')
                break;
            case 'drinks':
                setFocus('drinks')
                break;
            case 'requests':
                setFocus('requests')
                break;
            case 'friends':
                setFocus('friends')
            default:
                break;
        }
    }
    let dispatch = useDispatch()
    useEffect(()=>{

        dispatch(getUser(username))
    },[username,dispatch])

    let user = useSelector(state => state?.profile)

    useEffect(()=> {
        if(user.id){
        dispatch(getUserReviews(user.id))
        }
    },[user.id,dispatch])

    let userId = useSelector(state => state.session.user?.id)

    useEffect(()=> {

        if(userId && user?.id === userId){
            setOwner(true)
        }else{
            setOwner(false)
        }
    },[ user.id, userId,dispatch])


    useEffect(()=> {

            async function fetchData(){
            let users = {userOneId: userId,userTwoId: user.id}
        
            let res = await csrfFetch('/api/friends/check',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(users)
            })
            let check = await res.json()

            if(check === true){
                setFriends(true)
            }else{
                setFriends(false)
            }
        }
        if(userId !== undefined && user.id !== undefined){
        fetchData()}

        return(setFriends(false))
    },[user,userId])

    let reviews = useSelector (state => state.reviews.userReviews)

    useEffect(()=> {

        dispatch(getDrinks())
    },[dispatch])

    let drinksState = useSelector( state => state.drinks)

    let drinks = Object.values(drinksState).filter(drink => drink.creatorId === user.id).reverse()

    useEffect(()=>{

    },[drinksState])

    return (
        <ProfileSty>
        {user.username && <div className = 'main-content'>
        <div className = 'profile-header'>
            {user && <h2 className = 'heading'>{user.username}</h2>}
            {reviews && <h3>Total Reviews: {reviews?.length}
            </h3>}
            {drinks && <h3>Brewed {drinks?.length} {drinks.length === 1   ? 'Potion': 'Potions'}</h3>}
            {/* {!owner && friends && <h3>Congrats on your friendship!</h3>} */}
            {!owner  && friends!== undefined && <RequestButton friends = {friends} userTwoId = {user.id} />}
        </div>
        <div className = 'switch-bar'>
            <span className ='bar-item focused' onClick = {(e)=> switchFocus('user',e)}>{owner ? 'Your': user?.username} Reviews</span>
            <span className ='bar-item' onClick = {(e)=> switchFocus('drinks',e)}>{owner ? 'Your': user?.username} Drinks</span>
            {owner &&<span className ='bar-item' onClick = {(e)=> switchFocus('requests',e)}>{owner ? 'Your': user?.username} Friend Requests</span>}
            {owner &&<span className ='bar-item' onClick = {(e)=> switchFocus('friends',e)}>{owner ? 'Your': user?.username} Friend Activity</span>}
        </div>
        <div className = 'focus-content'>
            {reviews && focus === 'user' && <UserReviews reviews = {reviews} />}
            {drinks && owner &&focus === 'drinks' && <DrinkFormModal/>}
            {drinks && focus === 'drinks' && drinks.map(drink => {
                return (
                    <div className = 'drink-stuff'key = {drink.id}>
                    <DrinkDetails  drinkId = {drink.id} />
                     {owner &&<div className = 'drink-buttons'>
                        <EditDrinkFormModal drink = {drink} />
                        <DeleteDrinkModal drinkId = {drink.id}/>
                    </div>}
                    </div>
                )
            })}
            {focus === 'requests' && <RequestPage />}
            {focus === 'friends' && <FriendReviews userId = {userId}></FriendReviews>}

        </div>
        </div>}
        </ProfileSty>
    )
}

export default ProfilePage
