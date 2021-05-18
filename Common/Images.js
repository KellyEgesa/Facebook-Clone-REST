const multer = require("multer");
const upload = multer({ dest: "/uploads" });
module.exports.uploadImages = (req, res) => {
  let upload = multer({ storage: storage }).single("post_pic");

  upload(req, res, (err) => {
    console.log(req.file + "Here");
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    res.send({ image: req.file.path });
  });
};
