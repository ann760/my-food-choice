const seedUsers = require('./user-seeds');
const seedRestrictions = require('./restriction-seeds');
const seedProfiles = require('./profile-seeds');
const seedAdmin = require('./admin-seeds');
const seedFavFood = require('./favorite-seeds');
const seedUserFav = require('./userfav-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');

  await seedUsers();
  console.log('--------------');

  await seedRestrictions();
  console.log('--------------');

  await seedProfiles();
  console.log('--------------');

  await seedAdmin();
  console.log('--------------');

  await seedFavFood();
  console.log('--------------');

  await seedUserFav();
  console.log('--------------');

  process.exit(0);
};

seedAll();
