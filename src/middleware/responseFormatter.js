const responseFormatter = (req, res, next) => {
  res.success = (message, data = null) => {
      res.json({
          message: message,
          data: data,
          status: true
      });
  };

  res.error = (message, statusCode = 500, data = null) => {
      res.status(statusCode).json({
          message: message,
          data: data,
          status: false
      });
  };

  next();
};

module.exports = responseFormatter;
