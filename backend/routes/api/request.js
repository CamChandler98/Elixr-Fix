const express = require('express')
const asyncHandler = require('express-async-handler');
const {Drink, Review, User, Category, Request, Friend} = require('../../db/models')
const { Op } = require('sequelize');


const router = express.Router();

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

    if(requestCheck.length >= 1)return res.json('already requested')


    let newRequest = await Request.create({
        userOneId,
        userTwoId,
        pending:true
    })

    res.json(newRequest)
}))

router.put('/:requestId', asyncHandler( async (req,res) => {

} ))

module.exports = router
