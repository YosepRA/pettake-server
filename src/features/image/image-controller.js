const cloudinary = require('cloudinary').v2;

const { promiseResolver } = require('@Utils/index.js');

const imageController = {
  index(req, res) {
    res.send('PetTake image feature index.');
  },
  async create(req, res) {
    const { files } = req;

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: 'PetTake' }),
    );

    const [uploadResult, uploadError] = await promiseResolver(
      Promise.all(uploadPromises),
    );

    if (uploadError) {
      return res.json({
        status: 'error',
        message: `Cloudinary upload error: ${uploadError.message}`,
      });
    }

    const uploadData = uploadResult.map((file) => ({
      publicId: file.public_id,
      url: file.secure_url,
    }));

    return res.json({
      status: 'ok',
      data: uploadData,
    });
  },
  async remove(req, res) {
    const { publicId } = req.body;

    const [result, removeError] = await promiseResolver(
      cloudinary.uploader.destroy(publicId),
    );

    if (removeError) {
      return res.json({
        status: 'error',
        message: `Cloudinary remove error: ${removeError.message}`,
      });
    }

    return res.json({
      status: 'ok',
    });
  },
};

module.exports = imageController;
