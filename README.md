# Elixr

# Welcome to Elixr!

Elixr is a web application that allows users to submit fantastical beverages, leave a review of their beverage experience , view other reviews and explore a profile page that includes your reviews and beverages. Elixr is inspired by [Untappd](https://untappd.com/), a website where users can leave reviews of their drinking experience including the drink and the venue.

#### Live link: [Elixr](https://elixr-app.herokuapp.com/)
***


### Development
* You can read more about the project using the wiki located at: https://github.com/CamChandler98/Elixr-Fix/wiki
* To start a development environment:
    - Clone the repository at: hhttps://github.com/CamChandler98/Elixr-Fix
    - From the backend directory install dependencies:
       ```
       npm install
       ```
    - From the frontend directory install dependencies:
       ```
       npm install
       
       ```
    - From the backend directory start express server
       ```
       npm start
       ```
    - From the frontend directory start react
       ```
       npm start
       ```
    - Navigate to port specified in the frontend console output
### Technologies
  #### Front End
  - JavaScript
  - React-Redux
  - CSS styling
  - [Favicon.io](https://favicon.io/) for favicon
  - Heroku (Hosting)
  - Styled-Components
  #### Back End
  - Express.js
  - PostgreSQL (Database)
  - Sequelize.js
  - AJAX
  - Express Validator Library
  - CSURF Library
### Features

- Users can rate and leave reviews of potions!

<p align="center">
  <img src="https://raw.githubusercontent.com/CamChandler98/Elixr-Fix/main/visualization/elixr-review.gif" alt="elxir rating">
</p>

- Users can create new potions 

<p align="center">
  <img src="https://github.com/CamChandler98/Elixr-Fix/blob/main/visualization/Elixr-Create-Drink.gif?raw=true" alt="elxir drink">
</p>

- Users can send, accept and deny friend requests!
<p align="center">
  <img src="https://github.com/CamChandler98/Elixr-Fix/blob/main/visualization/Elixr-Send-Friend.gif?raw=true" alt="elxir send friend">
</p>
<p align="center">
  <img src="https://github.com/CamChandler98/Elixr-Fix/blob/main/visualization/Elixr-Accept-Friend.gif?raw=true" alt="elxir accept friend">
</p>


- Users have a profile where they can view their reviews, friends , and drinks!

<p align="center">
  <img src="https://raw.githubusercontent.com/CamChandler98/Elixr-Fix/main/visualization/Elixr-Profile.png" alt="elxir profile">
</p>

### Code Snippets
  #### Send a friend request
  ````javascript
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
  ````
  #### Validate a drink
  ````javascript
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
  ````
  
  

