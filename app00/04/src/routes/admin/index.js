import express from "express";
import controller from "./controller.js";

const router = express.Router();

router.get("/", controller.dashboard);

export default router;
