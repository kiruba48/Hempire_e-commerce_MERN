import express from 'express';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import AppError from '../utils/appError.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    const filename = file.originalname.split('.')[0];
    cb(null, `${filename}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
// const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image, Please upload only images', 400));
  }
};
const upload = multer({
  storage,
  fileFilter: multerFilter,
});
const resizeUploadedImage = (req, res, next) => {
  if (!req.file) return next();
  //   req.file.filename = ``;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/product-${req.user.id}-${Date.now()}.jpeg`);

  next();
};

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
