const mongoose = require("mongoose");
const { member_type_enums, member_type_status } = require("../lib/config");

const userSchema = new mongoose.Schema({
  user_nick: {
    type: String,
    required: true,
    index: { unique: true, sparse: true },
  },
  user_phone: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
    select: false,
  },
  user_type: {
    type: String,
    required: false,
    default: "USER",
    enum: {
      values: member_type_enums,
      message: "{VALUE} is not among permitted values",
    },
  },
  user_status: {
    type: String,
    required: false,
    default: "ACTIVE",
    enum: {
      values: ["BLOCKED", "ACTIVE", "DELETED"],
      message: member_type_status,
    },
  },
  user_full_name: {
    type: String,
    required: false,
  },
  user_adress: {
    type: String,
    required: false,
  },
  user_image: {
    type: String,
    required: false,
  },
  user_point: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
