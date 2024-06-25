const Product = require("../../models/Product");

const postProduct = (req, res, next) => {
  const uuid = req.body.uuid;
  const volume = req.body.volume;

  const product = new Product({
    UUID: uuid,
    volume,
  });

  product
    .save()
    .then((newProduct) => {
      res.status(201).json({
        message: "Product created!",
        product: newProduct,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = postProduct;
