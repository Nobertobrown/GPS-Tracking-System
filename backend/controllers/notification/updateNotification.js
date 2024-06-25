const Notification = require("../../models/Notification");

const putNotification = (req, res, next) => {
  const id = req.body.notificationId;
  const status = req.body.status;

  Notification.findByIdAndUpdate(id, {$set:{isRead:status}})
    .then((notification) => {
      if (!notification) {
        const error = new Error("Notification wasn't found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({success: true});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = putNotification;
