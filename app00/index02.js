import express from "express";
import helmet from "helmet";
import config from "config";
import userRouter from "./02/routes/users.js";
import homeRouter from "./02/routes/home.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// console.log("Application Name:", config.get("name"));
// console.log("Application version:", config.get("version"));
// console.log("sms:", config.get("SMS.ip"));

// if (app.get("env") === "development") {
//   console.log("morgan is active");
// }

app.use((req, res, next) => {
  // res.send('this response is coming from middleware 1')
  console.log("midd 1");
  next();
});

app.use((req, res, next) => {
  console.log("midd 2");
  next();
});

app.use("/api/users", userRouter);
app.use("/", homeRouter);

app.use((req, res, next) => {
  console.log("midd 3");
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});
