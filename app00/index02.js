import users from "./02/users.js";
import express from "express";
import { body, validationResult } from "express-validator";
import helmet from "helmet";
import config from "config";


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

app.get("/api/users", (req, res) => {
  res.json({
    data: users,
    message: "ok",
  });
});

app.use((req, res, next) => {
  console.log("midd 3");
  next();
});

app.post(
  "/api/users",
  [
    body("email", "email must be valid").isEmail(),
    body("first_name", "first name cant be empty").notEmpty(),
    body("last_name", "last name cant be empty").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    users.push({ id: users.length + 1, ...req.body });
    res.json({
      data: users,
      message: "ok",
    });
  }
);

app.put(
  "/api/users/:id",
  [
    body("email", "email must be valid").isEmail(),
    body("first_name", "first name cant be empty").notEmpty(),
    body("last_name", "last name cant be empty").notEmpty(),
  ],
  (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    if (!user) {
      return res.status(404).json({
        data: null,
        message: "the user with the given id was not found",
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    const users1 = users.map((user) => {
      if (user.id == req.params.id) {
        return { ...user, ...req.body };
      }
      return user;
    });
    res.json({
      data: users1,
      message: "ok",
    });
  }
);

app.delete("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      data: null,
      message: "the user with the given id was not found",
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json({
    data: users,
    message: "ok",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});
