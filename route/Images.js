const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:id", (req, res) => {
  var filePath = __dirname.split("/");
  filePath.pop();
  filePath = filePath.join("/") + "/postImage/" + req.params.id;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404);
      res.send({ message: "Image Not Found", status: "Not found" });
      return;
    } else {
      res.contentType("image/png");
      res.sendFile(filePath);
    }
  });
});

module.exports = router;
