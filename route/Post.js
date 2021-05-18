const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/Images.Js");

router.post("/create", upload.single("postImage"), async (req, res) => {
  console.log(req.file);
  res.send(req.file);
});

module.exports = router;
