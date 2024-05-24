const express = require("express");
const {
  getCustomers,
  postCustomers,
  putCustomer,
  deleteCustomer,
} = require("../controllers/controllers");

const router = express.Router();

router
  .route("/customer")
  .get(getCustomers)
  .post(postCustomers)
  .put(putCustomer)
  .delete(deleteCustomer);

module.exports = router;
