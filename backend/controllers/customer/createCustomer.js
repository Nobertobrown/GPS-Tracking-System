const Customer = require("../../models/Customer");

const postCustomer = (req, res, next) => {
  const customerName = req.body.name;
  const age = req.body.age;
  const nationalId = req.body.nationalId;
  const email = req.body.email;
  const address = req.body.address;
  const phoneNo = req.body.phoneNo;

  const customer = new Customer({
    name: customerName,
    age: age,
    nationalId: nationalId,
    email: email,
    address: address,
    phoneNo: phoneNo,
  });

  customer
    .save()
    .then((newCustomer) => {
      res.status(201).json({
        message: "Customer created!",
        customer: newCustomer,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = postCustomer;
