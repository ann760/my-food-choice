const router = require('express').Router();

const userRoutes = require('./user-routes');
const restrictionRoutes = require('./restriction-routes');
const profileRoutes = require('./profile-routes');
const adminRoutes = require('./admin-routes');
const favoriteRoutes = require('./favorite-routes');
const userFavRoutes = require('./userfav-routes');

router.use('/users', userRoutes);
router.use('/restrictions', restrictionRoutes);
router.use('/profiles', profileRoutes);
router.use('/admin',adminRoutes);
router.use('/favorite',favoriteRoutes);
router.use('/userfav',userFavRoutes);

module.exports = router;