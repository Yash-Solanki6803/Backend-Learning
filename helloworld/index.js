import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(8000, () => {
  console.log("Server is running on port 3000");
});
