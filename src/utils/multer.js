const mluter = require("multer");
const path = require("path");

//Multer configuration
module.exports = mluter({
  storage: mluter.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      req.file_error = "Only images are allowed";
      return cb(null, false);
    }
    cb(null, true);
  },
});
