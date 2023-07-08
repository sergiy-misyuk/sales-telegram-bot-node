const { visionCheck } = require('../middlewares/visionMiddleware');
const { uploadImage } = require('../helpers/uploadImageToBucket');

const checkOnePhotoSendCloud = async (req, res, next) => {
  const myFile = req.file;
  try {
    const imageUrl = await uploadImage(myFile);

    const checkImageContent = await visionCheck(imageUrl);

    res.status(200).json({
      message: 'Upload was successful',
      data: { imageUrl, checkImageContent },
    });
  } catch (error) {
    next(error);
  }
};

const checkSomePhotosSendCloud = async (req, res) => {
  const arrayPhotos = req.files;
  try {
    const unresolvedPromises = arrayPhotos.map(async item => {
      const imageUrl = await uploadImage(item);

      const checkImageContent = visionCheck(imageUrl);
      return checkImageContent;
    });

    const resultCheck = await Promise.all(unresolvedPromises);

    res.send({
      status: 'Upload was successful',
      resultCheck,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkOnePhotoSendCloud,
  checkSomePhotosSendCloud,
};
