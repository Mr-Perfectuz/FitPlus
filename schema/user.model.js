const mongoose = require("mongoose");
const {
  member_type_enums,
  member_type_status,
  ordinary_enums,
} = require("../lib/config");

const userSchema = new mongoose.Schema(
  {
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
    user_description: {
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
    user_top: {
      type: String,
      required: false,
      default: "ACTIVE",
      enum: {
        values: ["BLOCKED", "ACTIVE", "DELETED"],
        message: ordinary_enums,
      },
    },
    user_views: {
      type: Number,
      required: false,
      default: 0,
    },
    user_comment: {
      type: String,
      required: false,
      default: 0,
    },
    user_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    user_follow_cnt: {
      type: Number,
      required: false,
      default: 0,
    },
    user_subscriber_cnt: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
