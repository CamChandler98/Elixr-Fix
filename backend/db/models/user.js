const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull:false
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Drink, {foreignKey: 'creatorId'})
    User.hasMany(models.Review, {foreignKey: 'userId'})

    User.belongsToMany(models.User,{
      as:'friends',
      through: 'Friends',
      foreignKey:'userOneId',
      otherKey : 'userTwoId' })
    User.belongsToMany(models.User,{
      as: 'userFriends',
      through:'Friends',
      foreignKey:'userTwoId',
       otherKey : 'userOneId' })


    User.belongsToMany(models.User,{as: 'requester',through: 'Requests', foreignKey:'userOneId', otherKey : 'userTwoId' })
    User.belongsToMany(models.User,{as: 'reciever',through: 'Requests', foreignKey:'userTwoId', otherKey : 'userOneId' })

  };
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, private }) {

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      private
    });
    return await User.scope('currentUser').findByPk(user.id);
  };



  return User;
};
