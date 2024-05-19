import multer from "multer";
import fs from "fs";

if (process.env.MODE == "production") {
  const filePath = "/opt/render/project/src/build/src/controllers/uploads";

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
    console.log(`Directory created: ${filePath}`);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/controllers/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10mb max
});

export { upload };
