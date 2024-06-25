const Notification = require("../../models/Notification");

const deleteNotification = (req, res, next) => {
  const id = req.body.notificationId;

  Notification.findByIdAndDelete(id)
    .then((note) => {
      if (!note) {
        const error = new Error("Notification wasn't found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "The notification has been deleted!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = deleteNotification;
