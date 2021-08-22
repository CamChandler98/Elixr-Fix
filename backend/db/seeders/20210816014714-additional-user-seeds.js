'use strict';

const { genUser } = require("../../utils/seed-generation");
module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', genUser(25), {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
}
};
