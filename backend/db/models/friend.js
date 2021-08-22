'use strict';
const { Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER
  }, {});
  Friend.associate = function(models) {
    // associations can be defined here
    Friend.belongsTo(models.User, {foreignKey: 'userOneId'})
    Friend.belongsTo(models.User, {foreignKey: 'userTwoId'})
  };

  Friend.getUserFriends = async function(id){
    let friends = await Friend.findAll({
          where: {
              [Op.or]: [
                {userOneId : id},
                {userTwoId: id}
              ]
          }
       })

       return friends

  }
  return Friend;
};
