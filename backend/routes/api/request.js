const express = require('express')
const asyncHandler = require('express-async-handler');
const {Drink, Review, User, Category, Request, Friend} = require('../../db/models')
const { Op } = require('sequelize');
const { request } = require('express');


const router = express.Router();

router.post('/check' , asyncHandler(async (req,res) => {
    let {userOneId, userTwoId} = req.body

    let requestCheck = await Request.findAll({
        where:{
            [Op.and]: {userOneId,userTwoId}
        }
    })


    if(requestCheck.length > 0){
        res.json(true)
    }else{
        res.json(false)
    }

}))

router.get('/:userId', asyncHandler(async (req,res) => {
    let {userId} = req.params
    let usersRequests = await Request.findAll({
        where:{
            userTwoId: userId,
            pending: true
        }
    })

    res.json(usersRequests)
}))

router.post('/', asyncHandler(async (req,res) => {
    let {userOneId, userTwoId} = req.body

    let requestCheck = await Request.findAll({
        where:{
            [Op.and]: {userOneId,userTwoId}
        }
    })

    let friendCheck = await Friend.findAll({
        where: {
            userOneId:{[Op.or]: [userOneId,userTwoId]},
            userTwoId: {[Op.or] : [userOneId,userTwoId]}
        }
    })


    if(requestCheck.length >= 1)return res.json('already requested')
    if(friendCheck.length > 0) return res.json('already friends')

    let newRequest = await Request.create({
        userOneId,
        userTwoId,
        pending:true
    })

    res.json(newRequest)
}))

router.delete('/:requestId', asyncHandler (async (req,res)=> {
        let {requestId} = req.body

        let request = Request.findByPk(requestId)

        await request.destroy()

}))

module.exports = router
