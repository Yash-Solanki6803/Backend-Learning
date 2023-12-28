import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://YashSolanki:yashjklv06@learningcluster.wzjix0t.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "learning",
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const userSchema = new mongoose.Schema({
  name: String,
  enrollment: Number,
  password: String,
});

const User = new mongoose.model("User", userSchema);

const secret = process.env.JWT_SECRET;

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (token) {
    const { enrollment } = jwt.verify(token, secret);

    const user = await User.findOne({ enrollment });
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  const { name, enrollment } = req.user;
  res.render("logout", {
    name,
    enrollment,
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/register", async (req, res) => {
  const { name, enrollment, password } = req.body;
  if (enrollment.length != 12) {
    res.render("register", {
      error: "Enrollment number should be of 12 digits",
    });
    return;
  }
  const userExists = await User.findOne({ enrollment: enrollment });

  if (userExists) {
    res.render("register", { error: "User already exists" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    enrollment,
    password: hashedPassword,
  });
  await user.save();

  //adding a token to the cookie
  const token = jwt.sign({ enrollment }, secret);
  res.cookie("auth-token", token);

  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const { enrollment, password } = req.body;
  const user = await User.findOne({ enrollment: enrollment });
  if (user) {
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (isPasswordTrue) {
      const token = jwt.sign({ enrollment }, secret);
      res.cookie("auth-token", token);
      res.redirect("/");
    } else {
      res.render("login", { enrollment, error: "Invalid Credentials" });
    }
  } else {
    res.render("login", { enrollment, error: "User doesn't exist." });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("auth-token");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
