const mongoose = require("../mongoose").default;
const { Schema } = require("mongoose");

const codiShema = new mongoose.Schema(
  { _id: Number },
  { collection: "codisComanda" }
);

const Codi = new mongoose.model("Codi", codiShema);

exports.default = Codi;
