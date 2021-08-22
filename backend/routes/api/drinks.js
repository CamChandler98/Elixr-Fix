const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const {Drink, Review, User, Category} = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateDrink = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Names are powerful, your potion needs one')
        .custom((value) => {
            return Drink.findOne({ where: { name: value } })
                .then((drink) => {
                    if (drink) {
                        return Promise.reject('It looks like there is already a drink with that name');
                    }
                });
        }),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Please give your potion a description'),
        handleValidationErrors
]

router.post('/', validateDrink, asyncHandler(async (req, res)=> {
    const {name, description, creatorId, categoryId } = req.body

    const newDrink = await Drink.create({
        name,
        description,
        creatorId,
        categoryId
      })

      const drink = await Drink.findOne({
        where:{id: newDrink.id},
        include: [
            {model: Category, attributes: ['name','id']} ,
            {model: User, attributes: ['username',]} ,
        ]
    })
    let averageRes = await Review.getDrinkRating(drink.id)

    drink.dataValues.avg = averageRes
    drink.dataValues.count = await Review.getReviewCount(drink.id)

    return res.json({drink,})



}))

router.get('/', asyncHandler(async (req, res)=> {
    let allDrinks = await Drink.findAll({
        include: [
            {model: Category, attributes: ['name','id']} ,
            {model: User, attributes: ['username']} ,
        ]
    })
   return res.json(allDrinks)
}))

router.get('/:id(\\d+)', asyncHandler( async (req,res)=> {
    const {id} = req.params
    const drink = await Drink.findOne({
        where:{id},
        include: [
            {model: Category, attributes: ['name','id']} ,
            {model: User, attributes: ['username',]} ,
        ]
    })
    let averageRes = await Review.getDrinkRating(id)

    drink.dataValues.avg = averageRes
    drink.dataValues.count = await Review.getReviewCount(id)
    return res.json(drink)
}))

router.delete('/:id(\\d+)', asyncHandler( async (req,res)=> {

    const {id} = req.body

    const drink = await Drink.findDestroy(parseInt(id))
    return res.json(drink)
}))

router.put('/:id(\\d+)', asyncHandler(async (req, res)=> {

    const {name, description, categoryId, id } = req.body
    const drink = await Drink.update( {id, name, description,categoryId })

    return res.json(drink)
}))

module.exports = router
