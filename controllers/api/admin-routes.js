const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Restriction, Profile, Admin } = require("../../models");

// GET all users /api/users
router.get("/", (req, res) => {
  console.log("=========GET=USERS========");
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Profile,
        attributes: [
          // "id",
          // "user_id",
          "restriction_id",
          [
            sequelize.literal(
              "(SELECT restriction_name FROM restriction WHERE id = restriction_id)"
            ),
            "restriction_name",
          ],
        ],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// GET all restrictions /api/restrictions
router.get("/restriction", (req, res) => {
  console.log("=========GET=RESTRICTION========");
  Restriction.findAll({
    attributes: ["id", "restriction_name", "category"],

    include: [
      {
        model: Profile,
        attributes: ["restriction_id", "user_id"],
        include: {
          model: User,
          attributes: ["first_name"],
        },
      },
      {
        model: User,
        attributes: ["last_name"],
      },
    ],
  })
    .then((dbRestrictData) => res.json(dbRestrictData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// login as a user /api/users/login
router.post("/admin-login", (req, res) => {
  console.log("=========LOGIN=route========");
  Admin.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbAdminData) => {
    if (!dbAdminData) {
      res.status(400).json({ message: "No user found with that email address!" });
      return;
    }

    const validPassword = dbAdminData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbAdminData.id;
      req.session.username = dbAdminData.username;
      req.session.first_name = dbAdminData.first_name;
      req.session.hostLoggedIn = true;

      res.json({ user: dbAdminData, message: "You are now logged in!" });
    });
  });
});

// logout as a user /api/users/logout
router.post('/admin-logout', (req, res) => {
  console.log("=========LOGOUT=========");
  if (req.session.hostLoggedIn) {
    res.clearCookie('connect.sid').status(200).send('OK');
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

/*
// GET one user /api/users/1
router.get("/:id", (req, res) => {
  console.log("=========GET=USER=ID========");
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Profile,
        attributes: ["id", "user_id", "restriction_id"],
        include: {
          model: Restriction,
          attributes: ["restriction_name"],
        },
      }
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});
*/
//POST create new user /api/users
router.post("/", (req, res) => {
  console.log("========CREATE=USER========");
  // expects {first_name: 'User', last_name: Smith, email: 'user@email.com', password: '1234'}
  Admin.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbAdminData) => {
      req.session.save(() => {
        req.session.user_id = dbAdminData.id;
        req.session.username = dbAdminData.username;
        req.session.first_name = dbAdminData.first_name;
        req.session.hostLoggedIn = true;

        res.json(dbAdminData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// PUT update a user /api/users/1
router.put("/:id", (req, res) => {
  console.log("=========UPDATE=Admin========");
  // expects {first_name: 'User, last_name: Last, email: 'user@email.com', password: '1234'}
  Admin.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbAdminData) => {
      if (!dbAdminData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbAdminData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// DELETE delete a user /api/users/1
router.delete("/:id", (req, res) => {
  console.log("=========DELETE=ADMIN========");
  Admin.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbAdminData) => {
      if (!dbAdminData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbAdminData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});


module.exports = router;
