import controller from '../controller.js';

export default new (class extends controller {
  async register(req, res){
    res.send('register');
  }

  async login(req, res){
    res.send('login');
  }
})();