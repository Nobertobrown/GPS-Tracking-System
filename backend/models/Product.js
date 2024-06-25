const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    UUID: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    lowerLimit: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
