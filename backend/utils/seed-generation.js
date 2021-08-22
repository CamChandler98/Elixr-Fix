
const faker = require('faker')
const bcrypt = require('bcryptjs');
const {User,Drink} = require('../db/models');


 const genUser = (genNum) => {
    faker.seed(200)
    let usersArr = []
    for(let i = 0; i < genNum; i++ ){
        let username = i%4 !== 0 ? faker.name.findName(): faker.internet.userName()
        let email = faker.internet.email(username)

        let hashedPassword = bcrypt.hashSync('password')

        let private = `${Math.round(Math.random())}`

        usersArr.push({
            username,
            email,
            hashedPassword,
            private,
        })
    }
    return usersArr
}

let potionnames = `Vial of Escapes
Elixir of Nimble Feet
Elixir of Mageblood
Vial of Potency
Flask of Clean Deaths
Elixir of Conflicts
Flask of Impotence
Elixir of Justice
Phial of the Sun
Elixir of Godly Powers
Draught of Balance
Draught of Blood
Tonic of Sunlight
Flask of the Beginning
Potion of the Sloth
Elixir of Reflexes
Potion of the Moon
Flask of Dreamless Sleeps
Philter of Nimble Feet
Potion of Anger`.split('\n')

const genPotions = () =>{
    let potionArr = []

    potionnames.forEach(potion => {
        let categoryId = Math.floor(Math.random() * (8 - 1 + 1)) + 1
        let creatorId = Math.floor(Math.random() * (28 - 1 + 1)) + 1
        let name = potion
        let description = faker.lorem.paragraph()
        potionArr.push({categoryId,creatorId,name,description})
    })
    return potionArr
}

const genCount = async (Model) => {
    const elements = await Model.findAll()

    let countObj = elements.reduce((accum,el)=> {
        accum[el.id] = {id: el.id, count:0}
        return accum
    },{})

    return countObj

}





const assignRandomReview = function (obj) {
    let keys = Object.keys(obj);
    let picked = keys[keys.length * Math.random() << 0]
    obj[picked].count = obj[picked].count + 1
    if(obj[picked].count > 9){
        delete obj[picked]
    }
    return picked
};

// let reviewImages = ['https://elixrawsbucket.s3.amazonaws.com/review-images/Galaxy-Lemonade-Final3.jpg','https://elixrawsbucket.s3.amazonaws.com/review-images/Galaxy-Magic-Moscow-Mule-A-Vodka-Cocktail-9-735x488.jpg','https://elixrawsbucket.s3.amazonaws.com/review-images/Magical-Color-Changing-Cocktails-The-Flavor-Bender-10.jpg','https://elixrawsbucket.s3.amazonaws.com/review-images/Unicorn-Blood-Cocktail.jpg'] ;

const genReviews = async () =>{
    let reviewImages = ['https://elixrawsbucket.s3.amazonaws.com/review-images/Galaxy-Lemonade-Final3.jpg','https://elixrawsbucket.s3.amazonaws.com/review-images/Galaxy-Magic-Moscow-Mule-A-Vodka-Cocktail-9-735x488.jpg','https://elixrawsbucket.s3.amazonaws.com/review-images/Magical-Color-Changing-Cocktails-The-Flavor-Bender-10.jpg','https://elixrawsbucket.s3.amazonaws.com/review-images/Unicorn-Blood-Cocktail.jpg'] ;

    let reviewArr = []


    let users = await genCount(User)

    let drinks = await Drink.findAll()

    for (let drink of drinks){

        let iterations = Math.floor(Math.random() * (5 - 1 + 1)) + 1
        let drinkId = drink.id

        for(let i = 0; i <= iterations; i++){
            let userId = assignRandomReview(users)
            let rating =  Math.floor(Math.random() * (5 - 1 + 1)) + 1
            let imageUrl = null
            if(Math.round(Math.random()) === 0){
                imageUrl = reviewImages[ Math.floor(Math.random() * reviewImages.length)]
            }
            let content = faker.lorem.paragraph()
            reviewArr.push({userId,drinkId,rating,content,imageUrl})
        }
    }
    return reviewArr
}


module.exports = {genUser,genPotions, genReviews}
