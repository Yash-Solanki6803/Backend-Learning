import express from "express";

const app = express();

const users = [];

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/register", (req, res) => {
  users.push({
    id: req.body.enrollment,
    password: req.body.password,
  });
  res.send("Form Submitted Successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
