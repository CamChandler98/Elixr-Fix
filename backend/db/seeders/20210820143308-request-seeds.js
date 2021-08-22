'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Requests', [
        {userOneId:20, userTwoId:5, pending: true},
        {userOneId:20, userTwoId:2, pending: true},
        {userOneId:2, userTwoId:15, pending: true},
        {userOneId:13, userTwoId:1, pending: true},
        {userOneId:16, userTwoId:1, pending: true},
        {userOneId:15, userTwoId:1, pending: true},
        {userOneId:2, userTwoId:7, pending: true},], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Requests', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
