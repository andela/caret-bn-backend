import cloudinary from 'cloudinary';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

const uploadSingle = req => {
  const singleImage = req.files.image.path;
  return cloudinary.uploader.upload(singleImage);
};

const uploadImages = async images => Promise.all(images.map(async element => {
  const image = element.path;
  try {
    const result = await cloudinary.uploader.upload(image);
    return result.url;
  } catch (error) {
    return error;
  }
}));

export default { uploadImages, uploadSingle };
