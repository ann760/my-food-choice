const { Profile, User, Restriction, Admin, Favorite, UserFavorites } = require("../models");
const sequelize = require('../config/connection');

const html_index = (req, res) => {
  res.redirect("/login");
};

const html_signup = (req, res) => {
  console.log("=====GET=signup=app=======");
  res.render("signup", {
    title: "Sign Up",
    color: "green",
    user_id: req.session.user_id,
    navLinkText: "Login",
    navLinkRoute: "login",
    navLinkId: "login",
    burgerNavLinkId: "burger-login"
  });
};

const html_login = (req, res) => {
  console.log("=====GET=login=app=====");

  if (req.session.guestLoggedIn) {
    res.redirect("/profile");
    return;
  }
  if (req.session.hostLoggedIn) {
    res.redirect("/reports");
    return;
  }

  res.render("login", {
    title: "Login",
    color: "green",
    user_id: req.session.user_id,
    navLinkText: "Sign Up",
    navLinkRoute: "signup",
    navLinkId: "signup",
    burgerNavLinkId: "burger-signup"
  });


};

const html_profile = (req, res) => {
  console.log("=====GET=profile=app=======");
  if (req.session.guestLoggedIn) {
    Restriction.findAll({
      attributes: ["id", "restriction_name", "category"]
    }).then((dbRestrictionData) => {
      res.render("profile", {
        title: "Restrictions",
        color: "green",
        first_name: req.session.first_name,
        user_id: req.session.user_id,
        restriction_data: dbRestrictionData,
        loggedIn: "guestLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      });
    })
  }
};

const html_favorites = (req, res) => {
  console.log("=====GET=favorites=app=======");
  if (req.session.guestLoggedIn) {
    Favorite.findAll({
      attributes: ["id", "food_name", "food_category"]
    }).then((dbFavoriteData) => {

      res.render("userfav", {
        title: "Favorites",
        color: "green",
        favorite_data: dbFavoriteData,
        first_name: req.session.first_name,
        user_id: req.session.user_id,
        loggedIn: "guestLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      });
    })
  }
};

const html_reports = (req, res) => {
  console.log("====GET=REPORT====");
  if (req.session.hostLoggedIn) {
    Admin.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      }
    }).then((userData) => {

      res.render("reports", {
        title: "Restrictions Reports",
        color: "blue",
        first_name: req.session.first_name,
        user_id: userData.id,
        loggedIn: "hostLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      });
    })
  }
};

const html_change_email = (req, res) => {
  if (req.session.guestLoggedIn) {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      }
    }).then((userData) => {

      res.render("changeEmail", {
        title: "Change Email",
        color: "green",
        first_name: req.session.first_name,
        user_id: userData.id,
        loggedIn: "guestLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      })
    })
  }
  if (req.session.hostLoggedIn) {
    Admin.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      }
    }).then((adminData) => {

      res.render("changeEmail", {
        title: "Change Email",
        color: "blue",
        first_name: req.session.first_name,
        user_id: adminData.id,
        loggedIn: "hostLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      })
    })
  }
}

const html_change_pw = (req, res) => {
  console.log(req.session.guestLoggedIn);
  console.log(req.session.hostLoggedIn);
  if (req.session.guestLoggedIn) {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      }
    }).then((userData) => {

      res.render("changePassword", {
        title: "Change Password",
        color: "green",
        first_name: req.session.first_name,
        user_id: userData.id,
        loggedIn: "guestLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      })
    })
  }
  if (req.session.hostLoggedIn) {
    Admin.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      }
    }).then((userData) => {

      res.render("changePassword", {
        title: "Change Password",
        color: "blue",
        first_name: req.session.first_name,
        user_id: userData.id,
        loggedIn: "hostLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      })
    })
  }
}

const html_foodfav_reports = (req, res) => {
  if (req.session.hostLoggedIn) {
    Admin.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      }
    }).then((userData) => {
      res.render("foodfavreport", {
        title: "Favorites Report",
        color: "blue",
        first_name: req.session.first_name,
        user_id: userData.id,
        loggedIn: "hostLoggedIn",
        navLinkText: "Logout",
        navLinkRoute: "",
        navLinkId: "logout",
        burgerNavLinkId: "burger-logout"
      })
    })
  }
}

module.exports = {
  html_index,
  html_signup,
  html_login,
  html_profile,
  html_favorites,
  html_reports,
  html_change_email,
  html_change_pw,
  html_foodfav_reports
}
