require("dotenv").config();

const express = require("express");
const { connectionDB } = require("./database/config");
const cors = require("cors");

// Create server from express
const app = express();

//CORS
app.use(cors());

//Public folder
app.use(express.static("public"));

//Reading and parsing the body
app.use(express.json());

// Data Base
connectionDB();

// Routes
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/hospitals", require("./routes/hospitals.routes"));
app.use("/api/doctors", require("./routes/doctors.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/all", require("./routes/search.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port" + " " + process.env.PORT);
});
