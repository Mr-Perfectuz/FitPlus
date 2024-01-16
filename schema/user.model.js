const mongoose = require("mongoose");
const {
  user_type_enums,
  user_type_status,
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
        values: user_type_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    user_status: {
      type: String,
      required: false,
      default: "ACTIVE",
      enum: {
        values: user_type_status,
        message: "{VALUE} is not among permitted values",
      },
    },

    user_description: {
      type: String,
      required: false,
      default: "",
    },
    user_adress: {
      type: String,
      required: false,
      default: "",
    },
    user_image: {
      type: String,
      required: false,
      default: "",
    },
    user_point: {
      type: Number,
      required: false,
      default: 0,
    },
    user_top: {
      type: String,
      required: false,
      default: "N",
      enum: {
        values: ordinary_enums,
        message: "{VALUE} is not among permitted values",
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
      default: "",
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
