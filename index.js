require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// ------------------------------------ middleware ------------------------------------ //

require("./config/db");
app.use(express.json());

// ------------------------------------ routes ------------------------------------ //

app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/user.routes"));

// ------------------------------------ default ------------------------------------ //

app.get("*", (req, res) => {
  res.status(404).json({ message: "Something is wrong with your routes", code: "EB404" });
});

app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
