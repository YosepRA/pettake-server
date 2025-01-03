const userController = {
  index(req, res) {
    res.send('PetTake user REST API index.');
  },
  register(req, res) {
    res.send('PetTake user REST API register.');
  },
  login(req, res) {
    res.send('PetTake user REST API login.');
  },
  logout(req, res) {
    res.send('PetTake user REST API logout.');
  },
  getUserSession(req, res) {
    res.send('PetTake user REST API get user session.');
  },
  protectedRouteTest(req, res) {
    res.send('PetTake user REST API protected route test.');
  },
};

module.exports = userController;
