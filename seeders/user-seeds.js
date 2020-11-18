const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    first_name: 'Ahmad',
    last_name: 'El Gamal',
    email: 'ahmad@email.com',
    password: '1234abcd'
  },
  {
    first_name: 'Brian',
    last_name: 'Lopez',
    email: 'brian@email.com',
    password: '1234abcd'
  },
  {
    first_name: 'Annie',
    last_name: 'AreYouOK',
    email: 'annie@email.com',
    password: '1234abcd'
  },
  {
    first_name: 'Aaditi',
    last_name: 'Pai',
    email: 'aadi@email.com',
    password: '1234abcd'
  }
    
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
