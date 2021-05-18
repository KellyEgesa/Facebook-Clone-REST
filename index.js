const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost/facebook-clone", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to mongodb at ${new Date()}`);
  });

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening to port ${port}`));
