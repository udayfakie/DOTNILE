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

// Set the path to the static directory
// const staticPath = path.join(__dirname, "public");

// Set the path to the public directory
// const publicPath = path.join(__dirname, "public");

// Serve static files from the static directory
// app.use(express.static(staticPath));

// Serve public files from the public directory
// app.use(express.static(publicPath));

// Route all other requests to the index.html file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

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

app.patch("/:id", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name, age, email } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} and connected to the dataBase`);
});
