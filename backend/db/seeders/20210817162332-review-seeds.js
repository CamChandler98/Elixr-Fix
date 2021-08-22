'use strict';

const { genReviews } = require("../../utils/seed-generation");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let reviews = await genReviews()
   return queryInterface.bulkInsert('Reviews', reviews,{});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {truncate: true, cascade: true, restartIdentity: true});
}
};
