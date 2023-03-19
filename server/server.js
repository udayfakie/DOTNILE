const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserModel = require("./models/Users");

dotenv.config();
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

//CONNECT TO THE DATA_BASE
mongoose.connect(process.env.DATABASE_CONNETCTION);
//GET REQUEST
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

//CREATE USEERS
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} and connected to the dataBase`);
});
