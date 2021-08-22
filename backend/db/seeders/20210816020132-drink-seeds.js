'use strict';

const { genPotions } = require("../../utils/seed-generation");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Drinks', [
      {name: 'Cosmic Killer', description: "One sip will send you to the astral plane, it is unknown what manner of place you'll end up if you drink it whie youre already there", creatorId: 2, categoryId:1},
      {name: 'No. 9', description: "Give this to your beloved to ensure you'll never be alone. Catuion: never is a very strong word", creatorId: 1, categoryId:3}
    ], {});

    return queryInterface.bulkInsert('Drinks', genPotions(), {});
   },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drinks', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
