const router = require("express").Router();

const { getUsers, createUser } = require("../models/user.model");

router.route("/").get(async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json("Get User Error: " + error.message);
  }
});

router.route("/add").post(async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = await createUser({ username });
    res.json("User added: " + newUser);
  } catch (error) {
    res.status(400).json("New User Error: " + error.message);
  }
});

module.exports = router;
