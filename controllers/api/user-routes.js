const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Restriction, Profile } = require("../../models");

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

// POST create new user /api/users
router.post("/", (req, res) => {
  console.log("========CREATE=USER========");
  // expects {first_name: 'User', last_name: Smith, email: 'user@email.com', password: '1234'}
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.first_name = dbUserData.first_name;
        req.session.guestLoggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// login as a user /api/users/login
router.post("/login", (req, res) => {
  console.log("=========LOGIN=route========");
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user found with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.first_name = dbUserData.first_name;
      req.session.guestLoggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// logout as a user /api/users/logout
router.post('/logout', (req, res) => {
  console.log("=========LOGOUT=========");
  if (req.session.guestLoggedIn) {
    res.clearCookie('connect.sid').status(200).send('OK');
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// PUT update a user /api/users/1
router.put("/:id", (req, res) => {
  console.log("=========UPDATE=USER=ID========");
  // expects {first_name: 'User, last_name: Last, email: 'user@email.com', password: '1234'}
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
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

// DELETE delete a user /api/users/1
router.delete("/:id", (req, res) => {
  console.log("=========DELETE=USER========");
  console.log(typeof(req.params.id));
  User.destroy({
    where: {
      id: parseInt(req.params.id),
    },
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

module.exports = router;
