module.exports = () => {
	const express = require("express");
	const router = express.Router();
	const Usuari = require("./models/Usuari").default;
	const Categoria = require("./models/Categoria").default;
	const Producte = require("./models/Producte").default;
	const Comanda = require("./models/Comanda").default;
	const Codi = require("./models/Codi").default;
	const fs = require("fs");
	const { faker } = require("@faker-js/faker");

	/**** Routes ****/
	router.get("/hello", async (req, res) => {
		res.json({ msg: "Hello, world!" });
	});

	router.get("/hello/:name", async (req, res) => {
		res.json({ msg: `Hello, ${req.params.name}` });
	});

	router.get("/categories", async (req, res) => {
		res.send(await Categoria.find({}).populate("productes").exec());
		// res.send([
		// 	{
		// 		_id: faker.string.uuid(),
		// 		nom: faker.commerce.product(),
		// 		imatge: faker.image.url(),
		// 		productes: [
		// 			{ nom: faker.commerce.product(), preu: faker.commerce.price({ max: 3 }) },
		// 			{ nom: faker.commerce.product(), preu: faker.commerce.price({ max: 3 }) },
		// 			{ nom: faker.commerce.product(), preu: faker.commerce.price({ max: 3 }) },
		// 			{ nom: faker.commerce.product(), preu: faker.commerce.price({ max: 3 }) },
		// 			{ nom: faker.commerce.product(), preu: faker.commerce.price({ max: 3 }) },
		// 			{ nom: faker.commerce.product(), preu: faker.commerce.price({ max: 3 }) },
		// 		],
		// 	},
		// ]);
	});

	router.get("/producte", async (req, res) => {
		res.json(await Producte.findOne({ _id: req.query.id }));
	});

	router.get("/comandes", async (req, res) => {
		if (req.isAuthenticated()) {
			res.json(
				(
					await Usuari.findById(req.user._id)
						.populate({
							path: "comandes",
							model: "Comanda",
							populate: {
								path: "producte",
								model: "Producte",
							},
						})
						.exec()
				).comandes
			);
		} else {
			res.json(false);
		}
	});

	router.post("/comanda", async (req, res) => {
		if (req.isAuthenticated()) {
			if (
				req.body.producte !== null &&
				req.body.estat !== null &&
				req.body.comentaris !== null &&
				req.body.usuari !== null &&
				req.body.codi !== null &&
				req.body.preu !== null
			) {
				// console.log(req.body);
				const comanda = new Comanda({
					usuari: req.body.usuari,
					producte: req.body.producte,
					estat: req.body.estat,
					comentaris: req.body.comentaris,
					codi: req.body.codi,
				});
				comanda.save();
				const usuari = await Usuari.findById(req.body.usuari);
				const comandesUsuari = usuari.comandes;
				comandesUsuari.push(comanda._id);
				const saldo = usuari.saldo - preu;
				await Usuari.updateOne(
					{ _id: req.body.usuari },
					{ comandes: comandesUsuari, saldo }
				);
			}
		}
	});

	router.get("/generar-codi-comanda", async (req, res) => {
		if (req.isAuthenticated()) {
			let codiTrobat = null;
			while (true) {
				const codiAleatori = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
				if ((await Codi.findOne({ _id: codiAleatori })) === null) {
					codiTrobat = codiAleatori;
					const nouCodi = new Codi({
						_id: codiTrobat,
					});
					nouCodi.save();
					break;
				}
			}
			res.json(codiTrobat);
		} else {
			res.send("Not authenticated");
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

	router.get("/imatge-categoria/:categoriaId/:nomImatge", (req, res) => {
		filePath =
			__dirname +
			"/imatges/Categories/" +
			req.params.categoriaId +
			"/" +
			req.params.nomImatge;
		if (fs.existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.json({ message: "Not found" });
		}
	});

	router.get("/imatge-producte/:producteId/:nomImatge", (req, res) => {
		// res.send(faker.image.url());
		filePath =
			__dirname +
			"/imatges/Productes/" +
			req.params.producteId +
			"/" +
			req.params.nomImatge;
		if (fs.existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.json({ message: "Not found" });
		}
	});

	return router;
};
