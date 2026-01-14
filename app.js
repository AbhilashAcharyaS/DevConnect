const express = require("express");
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const initializeSocket = require("./src/utils/socket");
const chatRouter = require("./src/routes/chat");


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

