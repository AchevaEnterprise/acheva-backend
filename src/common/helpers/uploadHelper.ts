import multer from "multer";

let filePath: string;
if (process.env.MODE == "production") {
  filePath = "/opt/render/project/src/build/src/controllers/uploads";
} else {
  filePath = "src/controllers/uploads";
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
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
