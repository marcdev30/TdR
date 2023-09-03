const mongoose = require("../mongoose").default;

const producteSchema = new mongoose.Schema({
  nom: String,
  imatge: String,
  descripcio: String,
  preu: Number,
});

exports.producteSchema = producteSchema;

const Producte = new mongoose.model("Producte", producteSchema);

exports.default = Producte;
