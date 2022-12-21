require("dotenv").config();

const express = require("express");
const { connectionDB } = require("./database/config");
const cors = require("cors");

// Create server from express
const app = express();

//CORS
app.use(cors());

// Data Base
connectionDB();

// Routes
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hello world",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port" + " " + process.env.PORT);
});
