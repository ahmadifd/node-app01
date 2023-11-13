import express from "express";
import mongoose from "mongoose";
import config from "config";
import router from "./04/src/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(config.get("db.address"))
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));

app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
