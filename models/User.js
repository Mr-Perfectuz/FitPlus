const Definer = require("../lib/mistake");
const UserModel = require("../schema/user.model");

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
}

module.exports = User;
