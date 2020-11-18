const { Profile } = require("../models");

const profiledata = [
  {
    user_id: 2,
    restriction_id: 2
  },
  {
    user_id: 2,
    restriction_id: 4
  },
  {
    user_id: 2,
    restriction_id: 5
  },
  {
    user_id: 3,
    restriction_id: 1
  },
  {
    user_id: 3,
    restriction_id: 5
  } 
];

const seedProfiles = () => Profile.bulkCreate(profiledata);

module.exports = seedProfiles;
