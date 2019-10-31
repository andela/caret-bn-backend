import cloudinary from 'cloudinary';
import imagesHelper from './imagesHelper';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

const { uploadImages, uploadSingle } = imagesHelper;

const imageUploader = async (req, res) => {
  let images = [];
  try {
    if (req.files.image.length > 1) {
      images = await uploadImages(req.files.image);
    } else {
      images = await uploadSingle(req, res);
      images = images.url;
    }
    return images;

  } catch (error) {
    return res.send(error);
  }
};

export default imageUploader;
