const mongoose = require("mongoose");

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
