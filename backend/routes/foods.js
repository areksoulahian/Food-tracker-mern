const router = require("express").Router();

const {
  getFoods,
  createFood,
  getFoodbyId,
  updateFood,
  deleteFood,
} = require("../models/food.model");

router.route("/").get(async (req, res) => {
  try {
    const foods = await getFoods();
    res.json(foods);
  } catch (error) {
    res.status(400).json("Get Food Error: " + error.message);
  }
});

router.route("/add").post(async (req, res) => {
  const { username, foodName, calories, date } = req.body;

  try {
    const newFood = await createFood({ username, foodName, calories, date });
    res.json("Food added: " + newFood);
  } catch (error) {
    res.status(400).json("New Food Error: " + error.message);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const food = await getFoodbyId(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json("Food not found");
    }
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const success = await deleteFood(req.params.id);
    if (success) {
      res.json("Food deleted");
    } else {
      res.status(404).json("food not found to delete");
    }
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

router.route("/update/:id").post(async (req, res) => {
  try {
    const updatedFood = await updateFood(req.params.id, req.body);
    if (updatedFood) {
      res.json("Food updated");
    } else {
      res.status(404).json("food not found to update");
    }
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

module.exports = router;
