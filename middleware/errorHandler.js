const errorHandler = (err, req, res, next) => {
  res.status(400).send({
    message: err.reason,
  });
};

module.exports = {
  errorHandler,
};
