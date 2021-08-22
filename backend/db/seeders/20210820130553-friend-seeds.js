'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Friends', [{userOneId:1, userTwoId:2},
        {userOneId:1, userTwoId:3},
        {userOneId:1, userTwoId:4},
        {userOneId:1, userTwoId:5},
        {userOneId:1, userTwoId:6},
        {userOneId:10, userTwoId:1},
        {userOneId:11, userTwoId:1},
        {userOneId:3, userTwoId:1},], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Friends', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
