const router = require('express').Router();
const User = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ------------------------------------ register ------------------------------------ //

router.post("/register", async (req, res) => {

  try {
    let { username, password } = req.body;
    let user = new User({ username });
    user.password = await bcrypt.hash(password, 10);    
    await user.save();

    res.status(200).json({
      message: "Successfully registered",
    });

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          message: "Successfully registered",
        });
      }
    );
  } 
  catch (e) {
    res.status(500).json({
      message: "Failed to register",
    });
  } 
});

// ------------------------------------ login ------------------------------------ //

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne( { username } );

    // if user not found
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } 
  catch (e) {
    res.status(500).json({
      message: "Failed to login",
    });
  } 
});

// ------------------------------------ exports ------------------------------------ //

module.exports = router;