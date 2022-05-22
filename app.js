// ================== app starts ==============

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
//import db
const connectDB = require("./db/db");

dotenv.config({ path: "./db/.env" });
connectDB();

// ========== initializing app ============
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
