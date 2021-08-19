var http = require("http");
const app = require("./src/middleware");
const PORT = process.env.PORT;

http.createServer(app).listen(PORT, () => {
  console.log("Server is running!");
});
