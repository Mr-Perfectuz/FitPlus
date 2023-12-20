const Definer = require("../lib/mistake");
const UserModel = require("../schema/user.model");
const assert = require("assert");

class User {
  constructor() {
    this.userModel = UserModel;
  }

  async signupData(input) {
    try {
      let result;
      //   const salt = await bcrypt.genSalt();
      //   input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_user = new this.userModel(input);

      try {
        result = await new_user.save();
      } catch (mongo_error) {
        console.log(mongo_error);
        throw new Error(Definer.mongo_val_error);
      }
      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }
  async loginData(input) {
    try {
      const result = await this.userModel
        .findOne(
          { user_nick: input.user_nick },
          { user_nick: 1, user_password: 1 }
        )
        .exec();

      assert.ok(result, Definer.auth_err3);

      const isMatch = input.user_password === result.user_password;
      assert.ok(isMatch, Definer.auth_err4);

      console.log("result:", result);
      return await this.userModel
        .findOne({ user_nick: input.user_nick })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
