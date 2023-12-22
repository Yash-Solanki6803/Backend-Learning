import express from "express";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "./index.html"));
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
