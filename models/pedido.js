const { Schema, model } = require("mongoose");

const pedidoSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: "Clientes",
  },
  pedido: [
    {
      producto: {
        type: Schema.ObjectId,
        ref: "Product",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
  },
});

pedidoSchema.methods.toJSON = function () {
  const { __v, _id, ...pedido } = this.toObject();
  pedido.uid = _id;
  return pedido;
};

module.exports = model("Pedido", pedidoSchema);
