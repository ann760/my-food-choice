const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Restriction, Profile } = require("../../models");

// GET all  /api/profiles
router.get("/users", (req, res) => {
  console.log("====GET=profile====");
  Profile.findAll({
    attributes: [
      "id",
      "user_id",
      "restriction_id",
      [
        sequelize.literal(
          "(SELECT restriction_name FROM restriction WHERE restriction.id = profile.restriction_id)"
        ),
        "restriction_name",
      ],
    ],

    include: [
      {
        model: User,
        attributes: ["first_name", "last_name","email"],
      },
    ],
  })
    .then((dbRestrictData) => res.json(dbRestrictData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// GET all restrictions /api/profiles
router.get(`/user/:id`, (req, res) => {
  console.log("====GET=profile=BY=user====");
  Profile.findAll({
    where: {
      user_id: req.params.id,
    },
    attributes: [
      "id",
      "user_id",
      "restriction_id",
      [
        sequelize.literal(
          "(SELECT restriction_name FROM restriction WHERE restriction.id = profile.restriction_id)"
        ),
        "restriction_name",
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
      if (!dbProfileData) {
        res.status(303).json({ message: "No profile found with this id" });
        return;
      }
      res.json(dbProfileData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

router.get("/reports", (req,res) => {
  Profile.findAll({
     attributes: ['restriction_id',[sequelize.fn('count', sequelize.col('user_id')),'count']],
     group: ['restriction_id'],

  }).then((reportData) => {
        res.json(reportData);
  }).catch((err) => {
      console.log(err); 
      res.status(303).json(err);
  });
 
})

// GET all restrictions /api/profiles
router.get("/", (req, res) => {

  console.log("====GET=profile=BY=restriction====");

  Profile.findAll({
    attributes: [
      "id",
      "user_id",
      "restriction_id",
    ]
  }).then((dbRestrictData) => {

    const restrictionsReport = {
      "eggsCount": 0,
      "fishCount": 0,
      "glutenCount": 0,
      "peanutsCount": 0,
      "shellfishCount": 0,
      "soyCount": 0,
      "treenutCount": 0,
      "wheatCount": 0,
      "celiacCount": 0,
      "diabetesCount": 0,
      "goutCount": 0,
      "hypertensionCount": 0,
      "lactoseCount": 0,
      "buddhistCount": 0,
      "hinduCount": 0,
      "jewishCount": 0,
      "muslimCount": 0,
      "alcoholCount": 0,
      "caffeineCount": 0,
      "atkinsCount": 0,
      "ketoCount": 0,
      "lowcarbCount": 0,
      "lowfatCount": 0,
      "paleoCount": 0,
      "pescetarianCount": 0,
      "veganCount": 0,
      "vegetarianCount": 0
    };

    for (i = 0; i < dbRestrictData.length; i++) {
      switch (dbRestrictData[i].restriction_id) {
        case 1: restrictionsReport.eggsCount++;
          break;

        case 2: restrictionsReport.fishCount++;
          break;

        case 3: restrictionsReport.glutenCount++;
          break;

        case 4: restrictionsReport.peanutsCount++;
          break;

        case 5: restrictionsReport.shellfishCount++;
          break;

        case 6: restrictionsReport.soyCount++;
          break;

        case 7: restrictionsReport.treenutCount++;
          break;

        case 8: restrictionsReport.wheatCount++;
          break;

        case 9: restrictionsReport.celiacCount++;
          break;

        case 10: restrictionsReport.diabetesCount++;
          break;

        case 11: restrictionsReport.goutCount++;
          break;

        case 12: restrictionsReport.hypertensionCount++;
          break;

        case 13: restrictionsReport.lactoseCount++;
          break;

        case 14: restrictionsReport.buddhistCount++;
          break;

        case 15: restrictionsReport.hinduCount++;
          break;

        case 16: restrictionsReport.jewishCount++;
          break;

        case 17: restrictionsReport.muslimCount++;
          break;

        case 18: restrictionsReport.alcoholCount++;
          break;

        case 19: restrictionsReport.caffeineCount++;
          break;

        case 20: restrictionsReport.atkinsCount++;
          break;

        case 21: restrictionsReport.ketoCount++;
          break;

        case 22: restrictionsReport.lowcarbCount++;
          break;

        case 23: restrictionsReport.lowfatCount++;
          break;

        case 24: restrictionsReport.paleoCount++;
          break;

        case 25: restrictionsReport.pescetarianCount++;
          break;

        case 26: restrictionsReport.veganCount++;
          break;

        case 27: restrictionsReport.vegetarianCount++;
          break;
      }
    }

    res.json(restrictionsReport);

  });
});

// GET all restrictions from profile table /api/restrictions
router.get("/restriction/:id", (req, res) => {
  console.log("====GET=profile=BY=restriction====");
  console.log(req.session.user_id);
  Profile.findAll({
    where: {
      restriction_id: req.params.id,
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "user_id",
      "restriction_id",
      [
        sequelize.literal(
          "(SELECT restriction_name FROM restriction WHERE restriction.id = profile.restriction_id)"
        ),
        "restriction_name",
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
      if (dbProfileData.length === 0) {
        res.status(303).json({ message: "No profile found with this id" });
        return;
      }
      res.json(dbProfileData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// GET a restriction by id /api/profiles/1
router.get("/:id", (req, res) => {
  console.log("====GET=profile=BY=id====");
  Profile.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "user_id",
      "restriction_id",
      [
        sequelize.literal(
          "(SELECT restriction_name FROM restriction WHERE restriction.id = profile.restriction_id)"
        ),
        "restriction_name",
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

// POST create a restriction /api/profiles
router.post("/", (req, res) => {
  console.log("======POST=profile=====");
  // expects {"user_id": 1 ,"restriction_id": 8}
  Profile.create({
    user_id: req.session.user_id,
    restriction_id: req.body.restriction_id,
  })
    .then((dbProfileData) => res.json(dbProfileData))
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// PUT update a restriction by id /api/profiles/1
router.put("/:id", (req, res) => {
  console.log("=====UPDATE==profile=====");
  Profile.update(
    {
      user_id: req.session.user_id,
      restriction_id: req.body.restriction_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbProfileData) => {
      if (!dbProfileData) {
        res.status(303).json({ message: "No restriction found with this id" });
        return;
      }
      res.json(dbProfileData);
    })
    .catch((err) => {
      console.log(err);
      res.status(303).json(err);
    });
});

// DELETE a restriction by id /api/profiles/1
router.delete("/delete/:id", (req, res) => {
  console.log("=====DELETE==profile=====");
  console.log("id", req.params.id);
  Profile.destroy({
    where: {
      user_id: req.session.user_id,
      restriction_id: req.params.id,

    },
  })
    .then((dbProfileData) => {
      if (dbProfileData.length === 0){
        res.status(404).json({ message: "No restriction found with this id" });
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
