const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const app = express();
const validateSignupData = require("./utils/validate");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate user data
    validateSignupData(req);

    //encrypt password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email not present. Please Signup");
    }
    const isPasswordValid =await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successful!");
    } else {
      throw new Error("Password not valid!");
    }
  } catch (error) {
    res.status(400).send("Error Logging in: " + error.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email });
    if (users.length) res.send(users);
    else res.status(404).send("User not found!");
  } catch (error) {
    res.status(400).send("wrong!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Not allowed field!");
    }

    if (data?.skills?.length > 10)
      throw new Error("Skills should be less than 10!");
    if (data?.age < 10 || data?.age > 100) throw new Error("Please stay away!");
    if (data?.about?.length > 100)
      throw new Error("Enter description in less than 100 letters!");
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Updated successfully");
  } catch (error) {
    res.status(400).send("Update failed! :" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted!");
  } catch (error) {
    res.status(400).send("wrong!");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length) res.send(users);
    else res.status(404).send("User not found!");
  } catch (error) {
    res.status(400).send("wrong!");
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => console.log("Server Started"));
  })
  .catch((err) => console.log("Error while connecting to DB-", err));

// app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong!");
//     }
// })
