const express = require("express");
const { getCustomers, postCustomers } = require("../controllers/controllers");

const router = express.Router();

router.route("/customer").get(getCustomers).post(postCustomers);

module.exports = router;
