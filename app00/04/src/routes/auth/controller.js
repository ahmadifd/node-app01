import controller from "../controller.js";
import bcrypt from "bcrypt";

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
    res.send("login");
  }
})();
