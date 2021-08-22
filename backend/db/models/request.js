'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER,
    pending: DataTypes.BOOLEAN
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.User, {foreignKey: 'userOneId'})
    Request.belongsTo(models.User, {foreignKey: 'userTwoId'})
  };
  return Request;
};
