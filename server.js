// ----------------------------------------
// ========= importing app ===========
const app = require('./app')

//import router
const authRoute = require("./routes/authRoute");

//use Router
app.use("/user-register", authRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

