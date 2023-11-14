import controller from "./../controller.js";

export default new (class extends controller {
  async dashboard(req, res) {
    
    res.send("user dashboard");
  }

  async me(req, res) {
    this.response({
      res,
      data: { name: req.user.name, email: req.user.email },
    });
  }
})();
