const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

const foodRouter = require("./routes/foods");
const userRouter = require("./routes/users");

app.use("/foods", foodRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
