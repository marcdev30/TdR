/**** Node.js libraries *****/
const path = require("path");

/**** External libraries ****/
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Producte = require("./models/Producte").default;
const Categoria = require("./models/Categoria").default;

// DB configuration
const session = require("express-session");
const passport = require("passport");

// .env configuration
require("dotenv").config();

// Models
const Usuari = require("./models/Usuari").default;

/**** Configuration ****/
const app = express();

function createServer() {
	const apiRoutes = require("./apiRoutes")();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(morgan("combined"));
	app.use(cors());
	app.use(express.static(path.resolve("..", "client", "build")));
	app.use(
		session({
			secret: "e3Uecl59gxp2WM5cclI2",
			resave: false,
			saveUninitialized: false,
		})
	);

	const LocalStrategy = require("passport-local").Strategy;
	passport.use(new LocalStrategy(Usuari.authenticate()));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(Usuari.createStrategy());
	passport.serializeUser(Usuari.serializeUser());
	passport.deserializeUser(Usuari.deserializeUser());

	/**** Add routes ****/
	app.use("/api", apiRoutes);

	app.post("/registre", (req, res) => {
		// res.send("Process: " + process.env.CLIENT_URL);
		Usuari.register(
			new Usuari({ username: req.body.correu, nom: req.body.nom }),
			req.body.contrasenya,
			function (err, user) {
				if (err) {
					console.log(err);
					res.redirect("/registre");
				} else {
					req.login(user, err => {
						if (err) {
							res.redirect("/registre");
						} else {
							res.redirect("/");
						}
					});
				}
			}
		);
	});

	app.post(
		"/inici-sessio",
		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/inici-sessio?status=invalid",
		})
	);

	app.get("/tancar-sessio", (req, res) => {
		req.logout(err => {
			res.redirect("/inici-sessio");
		});
	});

	// "Redirect" all non-API GET requests to React's entry point (index.html)
	app.get("*", (req, res) =>
		res.sendFile(path.resolve("..", "client", "build", "index.html"))
	);

	return app;
}

module.exports = createServer;
