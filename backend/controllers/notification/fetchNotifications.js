const Notification = require("../../models/Notification");

const fetchNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find();

    if (notifications.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No notifications found!" });
    }

    return res.status(200).json({ success: true, notifications });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = fetchNotifications;
