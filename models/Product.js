const assert = require("assert");
const { shapeIntoMongoseObjectIdn } = require("../lib/config");
const ProductModel = require("../schema/product.model");
const Definer = require("../lib/mistake");
const User = require("./User");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAllProductsData(member, data) {
    try {
      let match = { product_status: "PROCESS" };

      if (data.gym_user_id) {
        match["gym_user_id"] = shapeIntoMongoseObjectIdn(data.gym_user_id);
        match["product_collection"] = data.product_collection;
      }
      const sort =
        data.order === "product_price"
          ? { [data.order]: 1 }
          : { [data.order]: -1 };

      const result = await this.productModel
        .aggregate([
          { $match: match },
          { $sort: sort },
          { $skip: (data.page * 1 - 1) * data.limit },
          { $limit: data.limit * 1 },
        ])
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getChosenProductData(member, id) {
    try {
      id = shapeIntoMongoseObjectIdn(id);

      if (member) {
        const member_obj = new User();
        await member_obj.viewChosenItemByMember(member, id, "product");
      }

      const result = await this.productModel
        .aggregate([{ $match: { _id: id, product_status: "PROCESS" } }])
        // toddo: check auth number product likes
        .exec();
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductDataResto(member) {
    try {
      member._id = shapeIntoMongoseObjectIdn(member._id);
      const result = await this.productModel.find({
        gym_user_id: member._id,
      });
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Products

  async addNewProductData(data, user) {
    try {
      data.gym_user_id = shapeIntoMongoseObjectIdn(user._id);
      console.log("data::", data);
      const new_product = new this.productModel(data);
      const result = await new_product.save();
      assert.ok(result, Definer.product_err1);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateChosenProductData(id, updated_data, user_id) {
    try {
      id = shapeIntoMongoseObjectIdn(id);
      user_id = shapeIntoMongoseObjectIdn(user_id);
      const result = this.productModel
        .findByIdAndUpdate(
          {
            _id: id,
            gym_user_id: user_id,
          },
          updated_data,
          { runValidators: true, lean: true, returnDocument: "after" }
        )
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
