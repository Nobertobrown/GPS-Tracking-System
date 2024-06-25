const Notification = require("../../models/Notification");

const postNotification = (req, res, next) => {
  const product = req.body.productId;
  const type = req.body.type;
  const content = req.body.content;
  const status = req.body.status;

  const notification = new Notification({
    product,
    type,
    content,
    isRead: status,
  });

  notification
    .save()
    .then((newNote) => {
      res.status(201).json({
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = postNotification;
