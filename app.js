// ================== app starts ==============

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./db/configDB.env" });
connectDB();
// ========== initializing app ============
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;


