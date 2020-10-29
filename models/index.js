// import all models
const User = require("./User");
const Event = require("./Event");
const Restriction = require("./Restriction");

User.hasMany(Restriction, {
  foreignKey: "user_id",
});

User.hasMany(Event, {
  foreignKey: "user_id",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
});

Restriction.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Event, Restriction };
