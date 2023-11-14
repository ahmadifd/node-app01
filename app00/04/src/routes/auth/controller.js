import controller from "../controller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export default new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "this user already registered",
      });
    }
    user = new this.User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    this.response({
      res,
      message: "the user successfuly registered",
      data: { _id: user._id, name: user.name, email: user.email },
    });
  }

  async login(req, res) {

    // try {
       throw new Error("There is an Error!");
    // } catch (er) {}

    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "invalid eamil or password",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "invalid eamil or password",
      });
    }
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({ res, message: "successfuly logged in", data: { token } });
  }
})();
