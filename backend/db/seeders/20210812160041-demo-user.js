'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'avalon@camelot.kingdom',
        username: 'Nimue',
        hashedPassword: bcrypt.hashSync('password'),
        private: false,
        profilePictureUrl: 'elixrawsbucket.s3.amazonaws.com/icons/pyramid.png'
      },
      {
        email: faker.internet.email(),
        username: 'Agatha',
        hashedPassword: bcrypt.hashSync('password'),
        private: false,
        profilePictureUrl: 'elixrawsbucket.s3.amazonaws.com/icons/bunny.png'
      },
      {
        email: faker.internet.email(),
        username: 'batildabladewitch',
        hashedPassword: bcrypt.hashSync('password'),
        private: false,
        profilePictureUrl: 'elixrawsbucket.s3.amazonaws.com/icons/square.png'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
}
};
