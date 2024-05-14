const Customer = require("../../models/Customer");

const fetchCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const customers = await Customer.find().select("name email address nationalId age phoneNo -_id").skip(skip).limit(limit);

    if (customers.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No customers found!" });
    }

    return res.status(200).json({ success: true, customers });
  } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
  }
};

module.exports = fetchCustomers;
