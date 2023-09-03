const mongoose = require("../mongoose").default;
const { Schema } = require("mongoose");

const usuariSchema = new mongoose.Schema({
  nom: String,
  correu: String,
  contrasenya: String,
  comandes: [{ type: Schema.Types.ObjectId, ref: "Comanda" }],
  saldo: Number,
});

const Usuari = new mongoose.model("Usuari", usuariSchema);

exports.default = Usuari;
