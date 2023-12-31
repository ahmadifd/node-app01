import express from "express";
import { body, validationResult } from "express-validator";

import mongoose from "mongoose";

const router = express.Router();

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

await mongoose
  .connect(
    "mongodb://root:XMBjo2J0QUCl9dRu@services.irn1.chabokan.net:2039/CompanyDB"
  )
  .then(async () => {
    console.log("connected");
  })
  .catch((err) => console.log("not connected", err));

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({
    data: users,
    message: "ok",
  });
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid id");

  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({
      data: null,
      message: "the user with the given id was not found",
    });
  res.json({
    data: user,
    message: "ok",
  });
});

router.post(
  "/",
  [
    body("email", "email must be valid").isEmail(),
    body("first_name", "first name cant be empty").notEmpty(),
    body("last_name", "last name cant be empty").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }

    let newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });

    newUser = await newUser.save();
    res.json({
      data: newUser,
      message: "ok",
    });
  }
);

router.put(
  "/:id",
  [
    body("email", "email must be valid").isEmail(),
    body("first_name", "first name cant be empty").notEmpty(),
    body("last_name", "last name cant be empty").notEmpty(),
  ],
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("invalid id");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        data: null,
        message: "the user with the given id was not found",
      });
    }

    res.json({
      data: user,
      message: "ok",
    });
  }
);

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid id");

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({
      data: null,
      message: "the user with the given id was not found",
    });
  }
  res.json({
    data: user,
    message: "ok",
  });
});

export default router;
