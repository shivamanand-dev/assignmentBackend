const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET;

const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const User = require("../models/auth/User");

router.post(
  "/register",
  [
    body("email", "Enter correct email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const { name, email, password, phone, profession } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //   Find user with same userName and email
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ success, message: "User Already Exists" });
    }

    //   Hash Password
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    //   Create User
    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        profession,
      });

      //   create jwt token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.status(201).json({
        success,
        user,
        authToken,
        message: "User created successfully",
      });
    } catch (error) {
      res.status(400).json({ message: "Error creating user" });
    }
  }
);

router.post("/login", async (req, res) => {
  let success = false;

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ success, message: "Invalid Credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(400).json({ success, message: "Invalid Credentials" });
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;

    let userDetails = await User.findOne({ email });

    res
      .status(201)
      .json({
        success,
        authToken,
        userDetails,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
