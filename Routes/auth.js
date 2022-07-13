const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../models/user");
const finduser = require("../middleware/finduser");
const secret = process.env.SEC;

//create a user using : POST "/api/auth/" Doesn't require AUTh
router.post("/api/auth", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ authToken: null, error: "please fill all the required details" });
  }

  try {
    const isAlreadyExist = await users.findOne({ email });
    if (isAlreadyExist) {
      return res
        .status(422)
        .json({ authToken: null, error: "User already exist" });
    }

    user = await users.create({ name, email, password });

    const data = {
      user: {
        id: user.id,
        name: user.name,
      },
    };

    const authToken = jwt.sign(data, secret);

    res.status(201).json({ authToken, message: "user reg successfully" });
  } catch (err) {
    console.log(err);
  }
});

//working of login
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ authToken: null, error: "invalid cridentials" });
    }

    const isUserExist = await users.findOne({
      authToken: null,
      email: email,
    });
    if (!isUserExist) {
      return res
        .status(422)
        .json({ authToken: null, error: "user doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isMatch) {
      return res.status(422).json({ authToken: null, error: "Wrong password" });
    }

    const data = {
      user: {
        id: isUserExist.id,
        name: isUserExist.name,
      },
    };

    const authToken = jwt.sign(data, secret);

    return res
      .status(200)
      .json({
        name: isUserExist.name,
        authToken,
        message: "user login successfully",
      });
  } catch (err) {
    console.log(err);
  }
});

//Route 3: find user
router.post("/api/finduser", finduser, async (req, res) => {
  try {
    userId = req.user.id;
    const findUser = await users.findById(userId).select("-password");
    res.send(findUser);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
