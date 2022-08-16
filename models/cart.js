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

module.exports = model("Cart", CartSchema);
