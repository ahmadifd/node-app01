import express from "express";
import mongoose from "mongoose";
import config from "config";
import router from "./04/src/routes/index.js";
//import winston from "winston";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(config.get("db.address2"))
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));

process.on("uncaughtException", (ex) => {
  console.log("uncaught exception");
  //winston.error(ex.message, ex);
  //process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("unhandleRejection");
  //winston.error(ex.message, ex);
  //process.exit(1);
});

//winston.add(new winston.transports.File({ filename: "logfile.log" }));

app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

//class class1 {
//   x = 0;
//   constructor() {}
//   func1() {
//     this.x = 1;
//     this.func2();
//   }
//   func2() {
//     this.x = 2;
//   }
// }

// const c1 = new class1();
// const c3 = c1.func1.bind(c1);
// c3();

// console.log(c1.x);
