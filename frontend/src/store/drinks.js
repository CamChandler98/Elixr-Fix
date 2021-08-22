import { csrfFetch } from './csrf';
const LOAD = 'drinks/load';
const ADD_DRINK = 'drinks/addDrink'
const DELETE_DRINK = 'drinks/deleteDrink'
const CURRENT = 'drinks/current'

const load = list => ({
    type: LOAD,
    list
})

export const current = (id) => ({
    type: CURRENT,
    id
})
const addOneDrink = drink =>({
    type: ADD_DRINK,
    drink
})

const deleteOneDrink = (id) => ({
    type: DELETE_DRINK,
    id
})

export const getDrinks = () => async (dispatch) => {
    const res = await fetch('/api/drinks')
    if (res.ok){
        const list = await res.json()
        dispatch(load(list))
    }
}


export const getOneDrink = (id) => async (dispatch) => {
    const res = await fetch(`/api/drinks/${id}`)
    if(res.ok){
        const drink = await res.json()
        dispatch(addOneDrink(drink))
        return drink
    }
}

export const addDrink = (drink) => async (dispatch) => {
    let res = await csrfFetch('/api/drinks',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(drink)
    })


    if(res.ok){
        let testRes = await res.json()
        let drink = testRes.drink
        console.log(drink)
        dispatch(addOneDrink(drink))
        return
    }
}

export const editDrink = (drink) => async (dispatch) => {

    let res = await csrfFetch(`/api/drinks/${drink.id}`,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(drink)
    })

    if(res.ok){
        let newDrink = await res.json()
        dispatch(addOneDrink(newDrink))
        return newDrink
    }
}

export const deleteDrink = (id) => async (dispatch) =>{
    let res = await csrfFetch(`/api/drinks/${id}`,{
        method: 'delete',
        body: JSON.stringify({id})
    })


    if(res.ok){
        dispatch(deleteOneDrink(id))
        return
    }
}




const drinkReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD: {
            let drinks = action.list.reduce((accum,drink) => {
                accum[drink.id] = drink
                return accum
            },{})
            return{
                ...state,
                ...drinks
            }
        }
        case ADD_DRINK:{
            console.log('action',action)
            console.log('action drink', action.drink)
            console.log('action drink id', action.drink.id)
            if(!state[action.drink.id]){
                return{
                    ...state,
                    [action.drink.id] : action.drink
                }
            }else{
                return{
                    ...state,
                    [action.drink.id]: {
                        ...state[action.drink.id],
                        ...action.drink
                    }
                }
            }
        }
        case DELETE_DRINK: {

            let newState = {...state}
            let deleteTarget = newState[action.id]
            if(deleteTarget){
                delete newState[action.id]
                return newState
            }
            return state
        }
        case CURRENT: {
            let newState = {...state}
            newState.currentDrink = action.id
            return {
                ...newState
            }
        }
        default:
            return state
    }
}

export default drinkReducer
