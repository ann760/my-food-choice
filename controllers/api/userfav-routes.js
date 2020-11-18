const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Favorite, UserFavorites } = require("../../models");

// GET all  /api/userfav
router.get("/users", (req, res) => {
  console.log("====GET=userfav====");
  UserFavorites.findAll({
    attributes: [
      "id",
      "user_id",
      "favorite_id",
      [
        sequelize.literal(
          "(SELECT food_name FROM favorite WHERE favorite.id = userfav.favorite_id)"
        ),
        "food_name",
      ],
    ],

    include: [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    ],
  })
    .then((dbFavoriteData) => res.json(dbFavoriteData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// GET all favorites /api/userfav
router.get(`/user/:id`, (req, res) => {
  console.log("====GET=favorites=BY=user====");
  UserFavorites.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "user_id",
      "favorite_id",
      [
        sequelize.literal(
          "(SELECT food_name FROM favorite WHERE favorite.id = userfav.favorite_id)"
        ),
        "food_name",
      ],
    ],

    include: [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    ],
  })
    .then((dbFavoriteData) => res.json(dbFavoriteData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// GET all favorites /api/userfav
router.get("/", (req, res) => {

  console.log("====GET=userfav=BY=favorite====");

  UserFavorites.findAll({
    attributes: [
      "id",
      "user_id",
      "favorite_id",
      [
        sequelize.literal(
          "(SELECT food_name FROM favorite WHERE favorite.id = userfav.favorite_id)"
        ),
        "food_name",
      ]
    ]
  }).then((dbFavoriteData) => res.json(dbFavoriteData))
});

//Get all users grouped by favorites
router.get("/favreports", (req,res) => {
  UserFavorites.findAll({
     attributes: ['favorite_id',[sequelize.fn('count', sequelize.col('user_id')),'count']],
     group: ['favorite_id'],

  }).then((reportData) => {
        res.json(reportData);
  }).catch((err) => {
      console.log(err); 
      res.status(303).json(err);
  });
 
})

// GET a favorite by id /api/userfav/1
router.get("/:id", (req, res) => {
  console.log("====GET=ID=userfav====");
  UserFavorites.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "user_id", "favorite_id", [sequelize.literal(
      "(SELECT food_name FROM favorite WHERE favorite.id = userfav.favorite_id)"
    ),
      "food_name",
    ],],

    include: [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    ],
  })
    .then((dbUserFavData) => {
      if (!dbUserFavData) {
        res.status(303).json({ message: "No favorite found with this id" });
        return;
      }
      res.json(dbUserFavData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});



// POST create a favorite /api/userfav
router.post("/", (req, res) => {
  console.log("======POST=profile=====");
  // expects {"user_id": 1 ,"restriction_id": 8}
  UserFavorites.create({
    user_id: req.session.user_id,
    favorite_id: req.body.favorite_id,
  })
    .then((dbUserFavData) => res.json(dbUserFavData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// PUT update a favorite by id /api/userfav/1
router.put("/:id", (req, res) => {
  console.log("=====UPDATE==userfav=====");
  UserFavorites.update(
    {
      user_id: req.session.user_id,
      favorite_id: req.body.favorite_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbUserFavData) => {
      if (!dbUserFavData) {
        res.status(404).json({ message: "No favorite found with this id" });
        return;
      }
      res.json(dbUserFavData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// DELETE a restriction by id /api/userfav/delete/1
router.delete("/delete/:id", (req, res) => {
  console.log("=====DELETE==profile=====");
  console.log("id", req.params.id);
  UserFavorites.destroy({
    where: {
      user_id: req.session.user_id,
      favorite_id: req.params.id,

    },
  })
    .then((dbUserFavData) => {
      if (dbUserFavData.length === 0){
        res.status(404).json({ message: "No favorite found with this id" });
        return;
      }
      res.json(dbUserFavData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

module.exports = router;
