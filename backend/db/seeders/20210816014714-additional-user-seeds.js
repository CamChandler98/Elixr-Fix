'use strict';

const { genUser } = require("../../utils/seed-generation");
module.exports = {
    up: async (queryInterface, Sequelize) => {
      let users = await genUser(25)
   return queryInterface.bulkInsert('Users', users, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
}
};
