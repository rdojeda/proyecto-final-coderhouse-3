const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

module.exports = model("Product", ProductSchema);
