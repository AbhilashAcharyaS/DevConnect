const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use(cors({
  origin:"https://dev-connect-ui-react.vercel.app",
  credentials:true,
}))

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter)

const server= http.createServer(app);

initializeSocket(server);


connectDB()
  .then(() => {
    console.log("DB connected successfully");
    server.listen(3000, () => console.log("Server Started at port 3000"));
  })
  .catch((err) => console.log("Error while connecting to DB-", err));

