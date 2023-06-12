const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passowrd: {
    type: String,
    required: true,
  },
});
const AdminModel = model("admins", AdminSchema);
module.exports = AdminModel;
