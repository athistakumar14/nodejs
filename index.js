const express = require("express");
const connectDb = require("./config/dbconnection");

const app = express();
const port = 4000;

connectDb();
app.use(express.json());
app.use(require("./routes/userRoutes"))
app.listen(port, () => {
  console.log(`server listen on : ${port}`);
});

