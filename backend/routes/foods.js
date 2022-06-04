const router = require("express").Router();
let Food = require("../models/food.model");

router.route("/").get((req, res) => {
  Food.find()
    .then((foods) => res.json(foods))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const foodName = req.body.foodName;
  const calories = req.body.calories;
  /* tslint:disable:no-unused-variable */
  //   const date = req.body.date;

  const newFood = new Food({ username, foodName, calories });

  newFood
    .save()
    .then(() => res.json("Food added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Food.findById(req.params.id)
    .then((food) => res.json(food))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json("Food deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Food.findById(req.params.id)
    .then((food) => {
      food.username = req.body.username;
      food.foodName = req.body.foodName;
      food.calories = req.body.calories;
      food.date = Date.parse(req.body.date);

      food
        .save()
        .then(() => res.json("Food updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
