const express = require('express')
const asyncHandler = require('express-async-handler');
const {Category, Drink, Review} = require('../../db/models');
const { route } = require('./drinks');
const router = express.Router();

router.get('/', asyncHandler( async (req,res) => {
    let categories = await Category.findAll()
    return res.json(categories)
}))

router.get('/:categoryId(\\d)/drinks', asyncHandler ( async (req,res) => {
    let {categoryId} = req.params
    let categoryDrinks = await Drink.findAll({
        where:{
            categoryId
        }
    })
    return res.json(categoryDrinks)
}))
module.exports = router
