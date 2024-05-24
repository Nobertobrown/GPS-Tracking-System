const Customer = require("../../models/Customer");

const deleteCustomer = (req, res, next) => {
  const id = req.body.customerId;

  Customer.findByIdAndDelete(id)
    .then((customer) => {
      if (!customer) {
        const error = new Error("Customer wasn't found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "The customer has been deleted!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = deleteCustomer;
