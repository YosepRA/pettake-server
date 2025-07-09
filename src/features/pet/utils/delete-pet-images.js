const cloudinary = require('cloudinary').v2;

const { promiseResolver } = require('@Utils/index.js');

async function deletePetImages(images) {
  const deletePromises = images.map((img) =>
    cloudinary.uploader.destroy(img.publicId),
  );

  const [results, deleteError] = await promiseResolver(
    Promise.all(deletePromises),
  );

  if (deleteError) {
    throw new Error(`Cloudinary image deletion error: ${deleteError}`);
  }

  return true;
}

module.exports = deletePetImages;
