const Product = require("../models/Product");
const Notification = require("../models/Notification");
const io = require("./socket");

module.exports = {
  lessLimitChecker: async (limit) => {
    try {
      if (typeof limit == "string") {
        limit = +limit;
      }
      const products = await Product.find({ volume: { $lt: limit } });
      products.forEach(async (product) => {
        const notifications = await Notification.find({
          product: product._id,
          isRead: false,
        });

        if (notifications.length > 0) {
          return;
        }

        const notification = new Notification({
          product,
          type: "alert",
          content: "Lower limit reached!",
          isRead: false,
        });

        const result = await notification.save();
        io.getIO().emit("notification", { note: result, action: "create" });
      });
    } catch (error) {
      throw error;
    }
  },
  greaterLimitChecker: async (limit) => {
    try {
      if (typeof limit == "string") {
        limit = +limit;
      }

      const products = await Product.find({ volume: { $gt: limit } });
      products.forEach(async (product) => {
        await Notification.findOneAndDelete({
          product: product._id,
          isRead: false,
        });
      });
      products.length > 0 &&
        io.getIO().emit("notification", { action: "delete" });
    } catch (error) {
      throw error;
    }
  },
};
