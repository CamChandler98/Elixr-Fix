import { csrfFetch } from "./csrf"

const GETREQ = `/friends/requests/get`
const ADDFRIEND = '/friends/add'

const getReq = (requests) =>( {
    type: GETREQ,
    requests
})
const addFriend = (record) =>({
    type: ADDFRIEND,
    record
})

export const getFriendRequests = (userId) => async (dispatch) =>{
    let res = await csrfFetch(`/api/requests/${userId}`)

    if(res.ok){
    let requests = await res.json()
    dispatch(getReq(requests))
    }
}

export const makeFriend = (users) => async (dispatch) => {
    let res = await csrfFetch('/api/friends',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(users)
    })

    if(res.ok){
        let newRecord = await res.json
    }
}


const friendReducer = (state = {requests:{},friends:{}} , action) => {
    switch(action.type){
        case GETREQ:{
            let requests = action.requests.reduce((accum,request)=>{
                accum[request.id] = request
                return accum
            },{})
            return {
                ...state,
                requests:{
                    ...state.requests,
                    ...requests
                }
            }
        }
        case ADDFRIEND: {
            return{
                ...state,
                friends: {
                    ...state.friends,
                    [action.record.id] : action.record
                }
            }
        }
        default: {
            return state
        }
    }
}


export default friendReducer
