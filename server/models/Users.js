const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  age: {
    type: String,
    required:false
  },
  email: {
    type: String,
    required:true
  },
});
module.exports = mongoose.model("User", UserSchema);
