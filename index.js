require("dotenv").config();

const express = require("express");
const { connectionDB } = require("./database/config");
const cors = require("cors");

// Create server from express
const app = express();

//CORS
app.use(cors());

//Reading and parsing the body
app.use(express.json());

// Data Base
connectionDB();

// Routes
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/login", require("./routes/auth.routes"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port" + " " + process.env.PORT);
});
