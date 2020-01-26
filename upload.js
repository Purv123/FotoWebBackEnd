var express = require("express");
var multer = require("multer");
var uploads = multer({ dest: "uploads/" });
var fs = require("fs");
const cors = require("cors");

var upload = express();

const corsOptions = {
  origin: " * ",
  optionsSuccessStatus: 200,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept"
};

upload.use(cors(corsOptions));

upload.post(
  "/singleImageUpload",
  uploads.single("img"),
  cors(corsOptions),
  function(req, res, next) {
    console.log(req);

    /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file.path;

    /** The original name of the uploaded file
          stored in the variable "originalname". **/
    var target_path = "uploads/" + req.file.originalname;

    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on("end", function() {
      console.log("done");
      fs.unlinkSync(req.file.path);
      res.json({
        test: "test"
      });
    });
    src.on("error", function(err) {
      console.log("error");
    });
  }
);

module.exports = upload;
