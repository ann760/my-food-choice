const { UserFavorites } = require("../models");

const profiledata = [
  {
    user_id: 2,
    favorite_id: 2
  },
  {
    user_id: 3,
    favorite_id: 4
  },
  {
    user_id: 2,
    favorite_id: 5
  },
  {
    user_id: 3,
    favorite_id: 30
  },
  {
    user_id: 2,
    favorite_id: 34
  }
];

const seedUserFav = () => UserFavorites.bulkCreate(profiledata);

module.exports = seedUserFav;
