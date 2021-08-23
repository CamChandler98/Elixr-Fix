const express = require('express')
const asyncHandler = require('express-async-handler');
const {Drink, Review, User, Category, Request, Friend} = require('../../db/models')
const { Op } = require('sequelize');


const router = express.Router();

router.post('/check', asyncHandler (async (req,res) => {
    let {userOneId,userTwoId} = req.body
    let friendCheck = await Friend.findAll({
        where: {
            userOneId:{[Op.or]: [userOneId,userTwoId]},
            userTwoId: {[Op.or] : [userOneId,userTwoId]}
        }
    })

    if(friendCheck.length > 0){
        res.json(true)
    }else{
        res.json(false)
    }
}))
router.get('/:userId', asyncHandler( async (req,res) => {
    let {userId} = req.params
    let friends = await Friend.getUserFriends(userId)
    res.json(friends)

}))

router.post('/', asyncHandler( async (req,res)=> {
    let {userOneId,userTwoId} = req.body
    let friendCheck = await Friend.findAll({
        where: {
            userOneId:{[Op.or]: [userOneId,userTwoId]},
            userTwoId: {[Op.or] : [userOneId,userTwoId]}
        }
    })
    if(friendCheck.length >= 1){
        res.json('already friends')
        return
    }

     let newRecord = await Friend.create({userOneId,userTwoId})

    //  let requests = await Request.findAll({
    //     where:{
    //         [Op.and]: {userOneId,userTwoId}
    //     }
    // })



     res.json(newRecord)
}))

router.delete('/', asyncHandler (async (req,res) => {
    let {userOneId,userTwoId} = req.body
    let friendCheck = await Friend.findAll({
        where: {
            userOneId:{[Op.or]: [userOneId,userTwoId]},
            userTwoId: {[Op.or] : [userOneId,userTwoId]}
        }
    })

    for( record of friendCheck){
        record.destroy()
    }
    res.json('ok')
}))
module.exports = router
