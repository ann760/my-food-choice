const router = require('express').Router();
const htmlRoutes = require('./html-routes.js');
const apiRoutes = require("./api");

// main routes
router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

// html error 404 route
router.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
    user_id: req.session.user_id,
    navLinkText: "Login",
    navLinkRoute: "login",
    navLinkId: "login",
    burgerNavLinkId: "burger-login"
  });
});

module.exports = router;