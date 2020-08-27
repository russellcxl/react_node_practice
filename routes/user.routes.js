const router = require('express').Router();
const User = require("../model/user.model");
const checkToken = require("../config/config");
require("dotenv").config();

// ------------------------------------ show ------------------------------------ //

router.get("/show", async (req, res) => {
  try {
    let user = await User.findById(req.user.id, "-password");
    res.status(200).json({
      user
    });
  }
  catch (e) {
    res.status(500).json({
      message: "Could not find user"
    })
  }
});

// ------------------------------------ index ------------------------------------ //

router.get("/index", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      users,
    });
  }
  catch (e) {
    res.status(500).json({
      message: "Could not access users",
    });
  }
});

module.exports = router;