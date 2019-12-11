import cloud from '../config/cloudinary';

export default (req, res, next) => {
  if (req.files || req.files !== null) {
    if (!req.files.image.mimetype.match(/image/g)) {
      return res
        .status(400)
        .send({ status: 400, message: 'avatar image format is invalid' });
    }
    cloud.uploader.upload(req.files.image.tempFilePath, async result => {
      req.imgLink = await result.url;
      next();
    });
    return;
  }
  next();
};
