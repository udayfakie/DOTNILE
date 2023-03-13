const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserModel = require("./models/Users");

dotenv.config();
const app = express();
const PORT = 3001;
app.use(cors())

mongoose.connect(process.env.DATABASE_CONNETCTION);

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} and connected to the dataBase`);
});
