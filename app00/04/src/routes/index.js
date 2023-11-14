import { Router } from "express";
import authRouter from "./auth/index.js";
import userrouter from "./user/index.js";
import { isLoggined, isAdmin } from "./../middlewares/auth.js";
import adminRouter from "./admin/index.js";
//import error from "./../middlewares/error.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/user", isLoggined, userrouter);
router.use("/admin", isLoggined, isAdmin, adminRouter);
//router.use(error);

export default router;
