const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));
