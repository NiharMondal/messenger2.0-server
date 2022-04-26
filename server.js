// ----------------------------------------
// ========= importing app ===========
const app = require('./app')

//import router
const authRoute = require("./routes/authRoute");

//use Router
app.use("/api/messenger/users", authRoute);



