const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserModel = require("./models/Users");
const userAuth = require("./routes/auth")

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


//DELETE USERS
app.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(deletedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//UPDATE USERS
app.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await UserModel.replaceOne({ _id: userId }, req.body);
    res.json({ updatedCount: updatedUser.modifiedCount });
  } catch (err) {
    res.status(500).json({error: 'something went worng'})
  }
});

app.use("/api/",userAuth)


app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} and connected to the dataBase`);
});
