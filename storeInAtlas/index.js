import express from "express";
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

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//schema
const userSchema = new mongoose.Schema({
  enrollment: {
    type: Number,
    required: true,
    length: 12,
  },
  password: {
    type: String,
    required: true,
  },
});

//model
const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  //Display the whole collection of users
  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register", (req, res) => {
  const user = new User({
    enrollment: parseInt(req.body.enrollment, 10),
    password: req.body.password,
  });
  user.save();
  console.log("user added");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
