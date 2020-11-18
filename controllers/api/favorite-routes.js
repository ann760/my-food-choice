const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Favorite, UserFavorites } = require("../../models");

// GET all favorite /api/favorite
router.get("/favorite", (req, res) => {
  console.log("=========GET=FAVORITE========");
  Favorite.findAll({
    attributes: ["id", "food_name", "food_category"]
  })
    .then((dbFavoriteData) => res.json(dbFavoriteData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});


// GET a favorite by id /api/favorite/1
router.get("/:id", (req, res) => {
  console.log("=========GET=FAVORITE=ID=======");
  Favorite.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["food_name","food_category"],
  })
    .then((dbFavoriteData) => {
      if (!dbFavoriteData) {
        res.status(404).json({ message: "No restricton found with this id" });
        return;
      }
      res.json(dbFavoriteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// POST create a favorite /api/favorite
router.post("/", (req, res) => {
  console.log("=========CREATE=FAVORITE========");
  // expects {"food_name": "My favorite", "category": Dessert}
  Favorite.create({
    food_name: req.body.food_name,
    food_category: req.body.food_category,
  })
    .then((dbFavoriteData) => res.json(dbFavoriteData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// PUT update a favorite by id /api/favorite/1
router.put("/:id", (req, res) => {
  console.log("=========UPDATE=FAVORITE========");
  Favorite.update(
    {
      food_name: req.body.food_name,
      food_category: req.body.food_category,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbFavoriteData) => {
      if (!dbFavoriteData) {
        res.status(404).json({ message: "No restriction found with this id" });
        return;
      }
      res.json(dbFavoriteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// DELETE a favorite by id /api/favorite/1
router.delete("/:id", (req, res) => {
  console.log("=========DELETE=FAVORITE=========");
  console.log("id", req.params.id);
  Favorite.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbFavoriteData) => {
      if (!dbFavoriteData) {
        res.status(404).json({ message: "No favorite found with this id" });
        return;
      }
      res.json(dbFavoriteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// GET all favorites /api / profiles
router.get("/favorite/:id", (req, res) => {
  console.log("====GET=profile=BY=favorite====");
  console.log(req.session.user_id);
  UserFavorites.findAll({
    where: {
      favorite_id: req.params.id,
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
    .then((dbProfileData) => {
      if (dbProfileData.length > 0) {
        res.status(404).json({ message: "No profile found with this id" });
        return;
      }
      res.json(dbProfileData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

module.exports = router;
