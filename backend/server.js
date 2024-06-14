const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
// const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

// connect to MongoDB
// const uri = process.env.ATLAS_URI;
// mongoose.connect(
//   uri,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("Connected to MongoDB!!!");
//   }
// );

// Connect to local JSON files
const dataFoldersPath = path.join(__dirname, "data");

if (!fs.existsSync(dataFoldersPath)) {
  fs.mkdirSync(dataFoldersPath);
}

// Connect to local Json files
const usersFilePath = path.join(dataFoldersPath, "users.json");
const foodsFilePath = path.join(dataFoldersPath, "foods.json");

const connectToJSONFiles = async () => {
  try {
    const usersData = await fs.promises.readFile(usersFilePath, "utf-8");
    const foodsData = await fs.promises.readFile(foodsFilePath, "utf-8");
    console.log("connected to local json files");
    console.log("Users data:", usersData);
    console.log("Foods data:", foodsData);
  } catch (error) {
    console.log("error connecting to json files", error);
  }
};

connectToJSONFiles();

// Routes
const foodRouter = require("./routes/foods");
const userRouter = require("./routes/users");

app.use("/foods", foodRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
