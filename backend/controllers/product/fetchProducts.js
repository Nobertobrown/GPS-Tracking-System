const Product = require("../../models/Product");

const fetchProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No products found!" });
    }

    return res.status(200).json({ success: true, products });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = fetchProducts;
