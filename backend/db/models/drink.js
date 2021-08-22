'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        len: [3,200]
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,600]
      }
    },
    creatorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Drink.associate = function(models) {
    // associations can be defined here
    Drink.hasMany(models.Review,{foreignKey: 'drinkId'})

    Drink.belongsTo(models.Category, {foreignKey: 'categoryId'})
    Drink.belongsTo(models.User, {foreignKey: 'creatorId'})
  };

  Drink.prototype.toImportant = function(){
    const {id,name,description,creatorId,categoryId} = this
    return {id,name,description,creatorId,categoryId}
  }

  Drink.makeDrink = async function ({name, description, creatorId, categoryId}) {
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
  let averageRes = await Review.getDrinkRating(id)

  drink.dataValues.avg = averageRes
  drink.dataValues.count = await Review.getReviewCount(id)
  }

  Drink.getOne = async function(id){
    const drink = await Drink.findByPk(id)
    return drink
  }

  Drink.findDestroy = async function(id){
    const drink = await Drink.findByPk(id)
    let rubble = await drink.destroy()
    return rubble
  }

  Drink.update = async function({id,name,description,categoryId}){
    let drink = await Drink.getOne(id)
    drink.name = name || drink.name
    drink.description = description || drink.description
    drink.categoryId = categoryId || drink.categoryId
    await drink.save()
    return drink.toImportant()
  }

  return Drink;
};
