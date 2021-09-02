import { csrfFetch } from "./csrf"

const GETREQ = `/friends/requests/get`
const GETFRIENDS = '/friends/get'
const ADDFRIEND = '/friends/add'
const DELETEREQ = '/friends/requests/delete'
// const SENDREQUEST = '/friends/requests/send'
const deleteReq = (id) => ({
    type: DELETEREQ,
    id
})
const getReq = (requests) =>( {
    type: GETREQ,
    requests
})
const getFriends = (friends) =>( {
    type: GETFRIENDS,
    friends
})
const addFriend = (record) =>({
    type: ADDFRIEND,
    record
})

export const deleteOneReq = (id) => async(dispatch) => {
   let res = await csrfFetch(`/api/requests/${id}`, {
        method: 'delete',
        body: JSON.stringify({id})
    })
    if(res.ok){
        dispatch(deleteReq(id))
        return
    }
}
export const getFriendRequests = (userId) => async (dispatch) =>{
    let res
    if (userId){
     res = await csrfFetch(`/api/requests/${userId}`)
    }
    if(res.ok){
    let requests = await res.json()
    dispatch(getReq(requests))
    }
    return
}
export const goGetFriends = (userId) => async (dispatch) =>{
    let res
    if(userId){
     res = await csrfFetch(`/api/friends/${userId}`)
    }
    if(res.ok){
    let friends = await res.json()
    dispatch(getFriends(friends))
    }
}

// export const sendFriendRequest = async (users) => {
//     let res = await csrfFetch('/api/requests',{
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(users)
//     })
//     return await res.json()
// }

export const makeFriend = (users) => async (dispatch) => {
    let res = await csrfFetch('/api/friends',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(users)
    })

    if(res.ok){
        let newRecord = await res.json()
        dispatch(addFriend(newRecord))
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
        case GETFRIENDS:{
            let friends = action.friends.reduce((accum,friend)=>{
                accum[friend.id] = friend
                return accum
            },{})
            return {
                ...state,
                friends:{
                    ...state.friends,
                    ...friends
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
        case DELETEREQ: {

            let newState = {...state}
            let newRequests = {...newState.requests}
            let deleteTarget = newRequests[action.id]
            if(deleteTarget){
                delete newRequests[action.id]
                newState.requests = {...newRequests}
                return{...newState}
            }
            return state
        }
        default: {
            return state
        }
    }
}


export default friendReducer
