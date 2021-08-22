'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'private',{allowNull: false, type: Sequelize.BOOLEAN});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'private');

}
};
