import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import filesPayloadExists from "./05/middlewares/filesPayloadExists.js";
import fileExtLimiter from "./05/middlewares/fileExtLimiter.js";
import fileSizeLimiter from "./05/middlewares/fileSizeLimiter.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"05" ,"index.html"));
  //res.send("Hello Farshid");
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname,"05", "files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
