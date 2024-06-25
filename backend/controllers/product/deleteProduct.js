const Product = require("../../models/Product");

const deleteProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.findByIdAndDelete(id)
    .then((product) => {
      if (!product) {
        const error = new Error("Product wasn't found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "The product has been deleted!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = deleteProduct;
