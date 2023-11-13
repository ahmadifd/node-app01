import controller from "./../controller.js";

export default new (class extends controller {
  async dashboard(req, res) {
    res.send("admin dashboard");
  }
})();
