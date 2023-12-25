import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (token) {
    next();
  } else {
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout");
});

app.post("/login", (req, res) => {
  res.cookie("auth-token", "token");
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie("auth-token");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
