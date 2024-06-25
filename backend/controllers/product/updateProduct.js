const Product = require("../../models/Product");

const putProduct = (req, res, next) => {
  const id = req.body.productId;
  const volume = req.body.volume;
  const limit = req.body.limit;

  if (limit) {
    return Product.updateMany({}, { $set: { lowerLimit: limit } })
      .then(() => {
        res.status(200).json({ message: "The limit has been updated!" });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }

  Product.findByIdAndUpdate(id, {
    volume,
  })
    .then((product) => {
      if (!product) {
        const error = new Error("Product wasn't found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "The product has been updated!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = putProduct;
