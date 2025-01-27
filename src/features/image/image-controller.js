const imageController = {
  index(req, res) {
    res.send('PetTake image feature index.');
  },
  create(req, res) {
    console.log(req.files);

    res.send('PetTake image upload route.');
  },
  remove(req, res) {
    res.send('PetTake image remove route.');
  },
};

module.exports = imageController;
