const Product = require("../../models/Product");
const Notification = require("../../models/Notification");
const io = require("../../utils/socket");
const {
  lessLimitChecker,
  greaterLimitChecker,
} = require("../../utils/limitAlert");

const putProduct = (req, res, next) => {
  const id = req.body.productId;
  const volume = req.body.volume;
  const limit = req.body.limit;

  if (limit) {
    return Product.updateMany({}, { $set: { lowerLimit: limit } })
      .then(() => {
        lessLimitChecker(limit);
        greaterLimitChecker(limit);
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
      if (volume < product.lowerLimit) {
        const notification = new Notification({
          product: product,
          type: "alert",
          content: "Lower limit reached!",
        });

        return notification.save().then((result) => {
          io.getIO().emit("notification", { note: result, action: "create" });
          res.status(200).json({ message: "The product has been updated!" });
        });
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
