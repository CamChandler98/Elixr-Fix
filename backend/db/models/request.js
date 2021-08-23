'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER,
    pending: DataTypes.BOOLEAN
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.User, {as: 'sender', foreignKey: 'userOneId'})
    Request.belongsTo(models.User, {as: 'reciever',foreignKey: 'userTwoId'})
  };
  return Request;
};
