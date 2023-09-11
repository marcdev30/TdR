const mongoose = require("../mongoose").default;
const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const usuariSchema = new mongoose.Schema({
	nom: String,
	username: String,
	comandes: [{ type: Schema.Types.ObjectId, ref: "Comanda" }],
	saldo: Number,
	password: String,
});

usuariSchema.plugin(passportLocalMongoose);

const Usuari = new mongoose.model("Usuari", usuariSchema);

exports.default = Usuari;
