const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

//middle ware
app.use(express.json());
app.use(require("./Routes/playlist"));
app.use(require("./Routes/auth"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("Frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`MoviesHub is lisitening at http://localhost:${port}`);
});
