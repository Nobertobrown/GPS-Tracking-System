const Customer = require("../../models/Customer");

const putCustomer = (req, res, next) => {
  const id = req.body.customerId;
  const customerName = req.body.name;
  const customerAge = req.body.age;
  const nida = req.body.nationalId;
  const email = req.body.email;
  const address = req.body.address;
  const phoneNo = req.body.phoneNo;

  Customer.findByIdAndUpdate(id, {
    name: customerName,
    age: customerAge,
    nationalId: nida,
    email: email,
    address: address,
    phoneNo: phoneNo
  })
    .then((customer) => {
      if (!customer) {
        const error = new Error("Customer wasn't found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "The customer has been updated!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = putCustomer;
