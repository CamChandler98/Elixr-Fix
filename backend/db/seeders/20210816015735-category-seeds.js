'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Categories', [
        {name:'Conjuration'},
        {name:'Evocation'},
        {name:'Enchantment'},
        {name:"Transmutation"},
        {name:'Illusion'},
        {name:'Abjuration'},
        {name: 'Divination'},
        {name:'Other'},
      ], {});

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {truncate: true, cascade: true, restartIdentity: true});
}
};
