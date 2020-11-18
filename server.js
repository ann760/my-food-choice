const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const PORT = process.env.PORT || 3001;

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

// use express-session cookie for user authentication
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "encryption on (dummy text)",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);
