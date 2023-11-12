import { Router } from "express";
import config from "config";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

const router = Router();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

router.get("/", (req, res) => {
  //res.send(config.get("DATABASE_URI"));
});

export default router;
