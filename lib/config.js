// enum values
exports.user_type_enums = ["USER", "ADMIN", "GYM"];
exports.user_type_status = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];
const mongoose = require("mongoose");

// product schema
exports.product_collection_enums = [
  "WEAR",
  "EQUIPMENT",
  "ACCESSORIES",
  "TOOLS",
  "SUPPLEMETS",
];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"]; // on sale => in stock => sold
exports.product_size_enums = ["small", "normal", "large"];
exports.product_volume_enums = [1, 5, 10, 20];

/************************************
 *      Mongodb related commands    *
 ************************************/

exports.shapeIntoMongoseObjectIdn = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
