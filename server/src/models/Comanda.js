const mongoose = require("../mongoose").default;
const { Schema } = require("mongoose");

const comandaSchema = new mongoose.Schema(
  {
    producte: { type: Schema.Types.ObjectId, ref: "Producte" },
    creada: { type: Date, default: Date.now },
    estat: String,
    comentaris: String,
  },
  { collection: "comandes" }
);

const Comanda = new mongoose.model("Comanda", comandaSchema);

exports.default = Comanda;
