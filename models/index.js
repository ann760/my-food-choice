// import all models
const Profile = require("./Profile");
const User = require("./User");
const Restriction = require("./Restriction");
const Admin = require("./Admin");
const UserFavorites = require("./UserFavorites");
const Favorite = require("./Favorite");

//this order is important, before creating the foreign key, the table has to be asssociated with the parent table first.
User.hasMany(Profile, {
 foreignKey: "user_id",
 onDelete: "cascade"
});

Profile.belongsTo(User, {
  foreignKey: "user_id",
});

Restriction.belongsTo(User, {
  foreignKey: "restriction_id",
});

Restriction.belongsTo(Profile, {
  foreignKey: "restriction_id",
});

Profile.hasMany(Restriction, {
  foreignKey: "restriction_id",
});

Favorite.belongsTo(User, {
  foreignKey: "favorite_id",
});

//this order is important , before creating the foreign key, the table has to be asssociated with the parent table first.
User.hasMany(UserFavorites, {
  foreignKey: "user_id",
  onDelete: "cascade"
});

UserFavorites.belongsTo(User, {
  foreignKey: "user_id",
});

UserFavorites.hasMany(Favorite, {
  foreignKey: "favorite_id",
});

Favorite.belongsTo(UserFavorites, {
  foreignKey: "favorite_id",
});



module.exports = { User, Profile, Restriction, Admin, UserFavorites, Favorite };

