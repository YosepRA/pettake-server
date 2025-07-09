function protectRoute(req, res, next) {
  if (req.isUnauthenticated()) {
    return res.status(401).send('You are not authenticated');
  }

  return next();
}

module.exports = protectRoute;
