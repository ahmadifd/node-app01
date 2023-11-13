import express  from 'express';
import controller from './controller.js';
import validator from './validator.js';

const router = express.Router();

router.post(
  '/register',
  validator.registerValidator(),
  controller.validate,
  controller.register.bind(controller)
);

router.post(
  '/login',
  validator.loginValidator(),
  controller.validate,
  controller.login.bind(controller)
);


export default router;