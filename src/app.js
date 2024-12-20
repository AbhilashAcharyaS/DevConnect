const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => console.log("Server Started"));
  })
  .catch((err) => console.log("Error while connecting to DB-", err));

