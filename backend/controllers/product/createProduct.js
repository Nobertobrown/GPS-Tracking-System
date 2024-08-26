const Product = require("../../models/Product");
const Notification = require("../../models/Notification");
const io = require("../../utils/socket")

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
      if (volume < newProduct.lowerLimit) {
        const notification = new Notification({
          product: product,
          type: "alert",
          content: "Lower limit reached!",
        });

        return notification.save().then((result) => {
          io.getIO().emit("notification", { note: result, action: "create" });
          res.status(201).json({
            message: "Product created!",
            product: newProduct,
          });
        });
      }

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
