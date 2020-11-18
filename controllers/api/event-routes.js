const router = require("express").Router();
const { Event, User, Restriction } = require("../../models");

// GET all events /api/events
router.get("/", (req, res) => {
  console.log("=========GET=========");
  Event.findAll({
    attributes: ["id", "event_name", "event_date"],

    include: [
      {
        model: Restriction,
        attributes: ["restriction"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET an event by id /api/events/1
router.get("/:id", (req, res) => {
  console.log("========GET=ID========");
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "event_name", "event_date"],

    include: [
      {
        model: Restriction,
        attributes: ["restriction", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST create a new event /api/events
router.post("/", (req, res) => {
  console.log("=========POST=========");
  // expects {"event_name": "My Party" ,"event_date": "2020-11-10" user_id: 1}
  Event.create({
    event_name: req.body.event_name,
    event_date: req.body.event_date,
    user_id: req.body.user_id,
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT update an event by id /api/events/1
router.put("/:id", (req, res) => {
  console.log("=========PUT=========");
  Event.update(
    {
      event_name: req.body.event_name,
      event_date: req.body.event_date,
      user_id: req.body.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE an event by id /api/events/1
router.delete("/:id", (req, res) => {
  console.log("=========DELETE========");
  console.log("id", req.params.id);
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
