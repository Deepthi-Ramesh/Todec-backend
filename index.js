const express = require("express");
const app = express();
var cors = require("cors");
const routes = require("./routes");
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(5000, () => {
  console.log("Hello server");
});
