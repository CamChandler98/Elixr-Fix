'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: {
        type: DataTypes.STRING,
        validate:{
          len: [0,2000]
        }
      },
    rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate:{
          min:0,
          max:5
        }
      },
    imageUrl: {
       type: DataTypes.STRING,
      },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    drinkId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Drink, {foreignKey: 'drinkId'})
    Review.belongsTo(models.User, {foreignKey: 'userId'})
  };

  // Review.prototype.getCreator = async function(){
  //   const { userId } = this
  //   console.log('model db', userModel)
  //   let user = await User.findByPk(userId)

  //   let name = user.username

  //   return name
  // }

  // Review.prototype.getDrink = async function(){
  //   const {drinkId} = this

  //   let drink = await Drink.findByPk(drinkId)

  //   let name = drink.name

  //   return name
  // }

  Review.getUserReviews = async function(userId){
    let reviews = await Review.findAll({
      where:{
        userId
      }
    })
    return reviews
  }
  // Review.getDrinkReviews = async function(drinkId){
  //     let reviews = await Review.findAll({
  //       where:{
  //         drinkId
  //       },
  //       include: {
  //         model:
  //       }
  //     })

  //     return
  // }
  Review.getDrinkRating = async function(drinkId){
    const avgRating = await Review.findAll({
      raw: true,
      where: {
          drinkId
      },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg']]
    })
    return Number(avgRating[0].avg).toFixed(2)

  }

  Review.getReviewCount = async function(drinkId){
    const numOfReviews = await Review.count({where: {drinkId}})

    return numOfReviews
  }
  return Review;
};
