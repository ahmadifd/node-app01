import express  from 'express';
import controller from './controller.js';
import validator from './validator.js';

const router = express.Router();

router.post(
  '/register',
  validator.registerValidator(),
  controller.validate.bind(controller),
  controller.register.bind(controller)
);

router.post(
  '/login',
  validator.loginValidator(),
  controller.validate.bind(controller),
  controller.login.bind(controller)
);


export default router;