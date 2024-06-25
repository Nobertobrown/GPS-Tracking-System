const express = require("express");
const {
  getCustomers,
  postCustomers,
  putCustomer,
  deleteCustomer,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
  getNotifications,
  postNotification,
  putNotification,
  deleteNotification,
} = require("../controllers/controllers");

const router = express.Router();

router
  .route("/customer")
  .get(getCustomers)
  .post(postCustomers)
  .put(putCustomer)
  .delete(deleteCustomer);

router
  .route("/product")
  .get(getProducts)
  .post(postProduct)
  .put(putProduct)
  .delete(deleteProduct);

router
  .route("/notification")
  .post(postNotification)
  .get(getNotifications)
  .put(putNotification)
  .delete(deleteNotification);

module.exports = router;
