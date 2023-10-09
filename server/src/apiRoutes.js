module.exports = () => {
	const express = require("express");
	const router = express.Router();
	const Usuari = require("./models/Usuari").default;
	const Categoria = require("./models/Categoria").default;
	const Producte = require("./models/Producte").default;
	const Comanda = require("./models/Comanda").default;

	/**** Routes ****/
	router.get("/hello", async (req, res) => {
		res.json({ msg: "Hello, world!" });
	});

	router.get("/hello/:name", async (req, res) => {
		res.json({ msg: `Hello, ${req.params.name}` });
	});

	router.get("/categories", async (req, res) => {
		res.send(await Categoria.find({}).populate("productes").exec());
	});

	router.get("/producte", async (req, res) => {
		res.json(await Producte.findOne({ _id: req.query.id }));
	});

	router.post("/comanda", async (req, res) => {
		if (req.isAuthenticated()) {
			if (
				req.body.producte !== null &&
				req.body.estat !== null &&
				req.body.comentaris !== null &&
				req.body.usuari !== null
			) {
				const comanda = new Comanda({
					usuari: req.body.usuari,
					producte: req.body.producte,
					estat: req.body.estat,
					comentaris: req.body.comentaris,
				});
				comanda.save();
			}
		}
	});

	router.get("/user", async (req, res) => {
		if (req.isAuthenticated()) {
			res.json(req.user);
		} else {
			res.json(false);
		}
	});

	router.get("/nom", async (req, res) => {
		if (req.isAuthenticated()) {
			res.json({ nom: req.user.nom });
		} else {
			res.json({ nom: "Error d'autenticació" });
		}
	});

	router.post("/nom", async (req, res) => {
		if (req.isAuthenticated() && req.body.nouNom) {
			const usuariEditat = await Usuari.findOneAndUpdate(
				{ username: req.user.username },
				{ nom: req.body.nouNom }
			);
			res.json({ nom: usuariEditat.nom });
		} else {
			res.json({ message: "Error d'autenticació" });
		}
	});

	router.get("/temps", async (req, res) => {
		const tempsActual = new Date();
		const tempsObjectiu = new Date(
			tempsActual.getFullYear(),
			tempsActual.getMonth(),
			tempsActual.getDate(),
			10,
			0,
			0
		);
		let diferenciaTempsMs = tempsObjectiu - tempsActual;
		if (diferenciaTempsMs < 0) {
			diferenciaTempsMs += 24 * 60 * 60 * 1000;
		}
		const hores = Math.floor(diferenciaTempsMs / (60 * 60 * 1000));
		const minuts = Math.floor((diferenciaTempsMs % (60 * 60 * 1000)) / (60 * 1000));
		const segons = Math.floor((diferenciaTempsMs % (60 * 1000)) / 1000);
		res.json({ hores: hores, minuts: minuts, segons: segons });
	});

	return router;
};
