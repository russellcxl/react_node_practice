const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth.token");

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to view this"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  }
  catch (e) {
    res.status(500).json({
      message: "Invalid token",
    });
  }
}
