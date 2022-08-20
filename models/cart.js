const { Schema, model } = require("mongoose");

const CartSchema = Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        amount: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CartSchema.methods.toJSON = function () {
  const { __v, password, _id, ...cart } = this.toObject();
  cart.uid = _id;
  return cart;
};

module.exports = model("Cart", CartSchema);
