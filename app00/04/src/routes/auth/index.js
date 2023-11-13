import express  from 'express';
import controller from './controller.js';
import validator from './validator.js';

const router = express.Router();

router.post(
  '/register',
  validator.registerValidator(),
  controller.validate,
  controller.register
);

router.post(
  '/login',
  validator.loginValidator(),
  controller.validate,
  controller.login
);


export default router;