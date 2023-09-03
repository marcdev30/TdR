const mongoose = require("../mongoose").default;
const { Schema } = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    nom: String,
    descripcio: String,
    imatge: String,
    productes: [{ type: Schema.Types.ObjectId, ref: "Producte" }],
  },
  { collection: "categories" }
);

const Categoria = new mongoose.model("Categoria", categoriaSchema);

exports.default = Categoria;
