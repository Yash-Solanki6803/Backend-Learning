import express from "express";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Yash Solanki", age: 20, address: "Ahmedabad" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
