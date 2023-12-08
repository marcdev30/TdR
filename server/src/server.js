/**** Node.js libraries *****/
const path = require("path");

/**** External libraries ****/
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// DB configuration
const session = require("express-session");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

// .env configuration
require("dotenv").config();

// Models
const Usuari = require("./models/Usuari").default;
const Producte = require("./models/Producte").default;
const Categoria = require("./models/Categoria").default;
const Comanda = require("./models/Comanda").default;

// Utils
const locale = require("./utils/locale").default;

/**** Configuration ****/
const app = express();

const axios = require("axios");

const authenticate = async (email, password) => {
	console.log("This is the email: " + email);
	console.log("This is the password: " + password);
	if (email === "email" && password === "password") {
		console.log("The credentials are right!");
		return Promise.resolve({ email: "email", password: "password" });
	}
	return null;
};

async function createServer() {
	const apiRoutes = require("./apiRoutes")();
	const mesDemanat = require("./utils/tasques")();

	const AdminJS = (await import("adminjs")).default;
	const AdminJSExpress = (await import("@adminjs/express")).default;
	AdminJSMongoose = await import("@adminjs/mongoose");
	const ComponentLoader = (await import("adminjs")).ComponentLoader;
	const componentLoader = new ComponentLoader();

	const compo = {
		ImageShow: componentLoader.add("ImageShow", "./image-show"),
		EntregarComanda: componentLoader.add("EntregarComanda", "./entregar-comanda"),
		AfegirSaldo: componentLoader.add("AfegirSaldo", "./afegir-saldo"),
		Dashboard: componentLoader.add("Dashboard", "./dashboard"),
	};

	const dashboardHandler = async () => {
		// Asynchronous code where you, e. g. fetch data from your database
		axios
			.get(
				process.env.REACT_APP_SERVER_URL +
					"/admin/api/resources/Comanda/actions/list?filters.estat=pendent"
			)
			.then(response => {
				return { records: response.data.records };
			});
	};

	const uploadFeature = (await import("@adminjs/upload")).default;

	AdminJS.registerAdapter({
		Resource: AdminJSMongoose.Resource,
		Database: AdminJSMongoose.Database,
	});
	const admin = new AdminJS({
		rootPath: "/admin",
		resources: [
			{
				resource: Usuari,
				options: {
					navigation: {},
					listProperties: ["nom", "username", "comandes", "saldo"],
					showProperties: ["nom", "username", "comandes", "saldo"],
					filterProperties: ["nom", "username", "saldo"],
					actions: {
						edit: { isAccessible: true, isVisible: false },
						new: { isAccessible: false, isVisible: false },
						myNewAction: {
							label: "amazing action",
							icon: "Add",
							actionType: "resource",
							component: "MyCustomAction",
							handler: (request, response, data) => {
								return {
									record: data.record.toJSON(data.currentAdmin),

									msg: "Hello world",
								};
							},
						},
					},
				},
			},
			{ resource: Comanda, options: { navigation: false } },
			{
				resource: Comanda,
				options: {
					id: "ComandesPendents",
					navigation: { name: "Comandes" },
					listProperties: ["usuari", "producte", "codi", "estat", "comentaris"],
					showProperties: [
						"usuari",
						"producte",
						"codi",
						"estat",
						"comentaris",
						"creada",
					],
					filterProperties: ["usuari", "producte", "creada", "codi"],
					actions: {
						list: {
							before: async (request, context) => {
								request.query.perPage = 500;
								return request;
							},
							after: async response => {
								// console.log(response.records);
								response.records = response.records.filter(
									record => record.params.estat === "pendent"
								);
								return response;
							},
						},
						new: {
							isAccessible: false,
							isVisible: false,
						},
					},
					properties: {
						estat: {
							availableValues: [
								{ value: "pendent", label: "Pendent" },
								{ value: "entregada", label: "Entregada" },
								{ value: "cancelada", label: "Cancel·lada" },
							],
						},
						// boto: {
						// 	components: { list: Components.BotoRealitzat },
						// },
					},
				},
			},
			{
				resource: Comanda,
				options: {
					id: "ComandesEntregades",
					navigation: { name: "Comandes" },
					listProperties: ["usuari", "producte", "estat", "comentaris"],
					actions: {
						list: {
							before: async (request, context) => {
								request.query.perPage = 500;
								return request;
							},
							after: async response => {
								// console.log(response.records);
								response.records = response.records.filter(
									record => record.params.estat === "entregada"
								);
								return response;
							},
						},
						new: {
							isAccessible: false,
							isVisible: false,
						},
					},
					properties: {
						estat: {
							availableValues: [
								{ value: "pendent", label: "Pendent" },
								{ value: "entregada", label: "Entregada" },
								{ value: "cancelada", label: "Cancel·lada" },
							],
						},
						// boto: {
						// 	components: { list: Components.BotoRealitzat },
						// },
					},
				},
			},
			{
				resource: Producte,
				options: {
					navigation: {},
					listProperties: ["nom", "preu", "descripcio"],
					showProperties: ["nom", "preu", "descripcio", "file", "fons"],
					editProperties: ["nom", "preu", "descripcio", "file", "fons"],
					filterProperties: ["nom", "preu"],
					properties: {
						preu: { type: "float" },
						descripcio: { type: "richtext" },
						key: {
							type: "string",
							isVisible: false,
						},
						imatge: {
							type: "string",
							components: {
								list: compo.ImageShow,
								show: compo.ImageShow,
							},
						},
						fons: {
							isVisible: {
								show: true,
								edit: true,
							},
							description:
								"Marqui aquesta casella si la imatge NO té un fons transparent.",
						},
					},
				},
				features: [
					uploadFeature({
						properties: { key: "key", filename: "imatge" },
						componentLoader,
						provider: {
							local: {
								bucket: "src/imatges/Productes",
								opts: {},
							},
						},
						validation: {
							mimeTypes: ["image/png", "image/webp", "image/jpeg", "image/jpeg"],
						},
					}),
				],
			},
			{
				resource: Categoria,
				options: {
					navigation: {},
					listProperties: ["nom", "productes"],
					showProperties: ["nom", "descripcio", "productes", "fons"],
					editProperties: ["nom", "descripcio", "file", "fons", "productes"],
					properties: {
						key: {
							type: "string",
							isVisible: false,
						},
						imatge: {
							type: "string",
							components: {
								list: compo.ImageShow,
								show: compo.ImageShow,
							},
						},
						fons: {
							isVisible: {
								show: true,
								edit: true,
							},
							description:
								"Marqui aquesta casella si la imatge NO té un fons transparent.",
						},
					},
				},
				features: [
					uploadFeature({
						properties: {
							key: "key",
							filename: "imatge",
							mimeType: "mimeType",
						},
						componentLoader,
						provider: {
							local: {
								bucket: "src/imatges/Categories",
								opts: {},
							},
						},
						validation: {
							mimeTypes: ["image/png", "image/webp", "image/jpeg", "image/jpeg"],
						},
					}),
				],
			},
		],
		pages: {
			"Afegir Saldo": {
				component: "AfegirSaldo",
			},
			"Entregar una comanda": {
				component: "EntregarComanda",
			},
		},
		branding: {
			withMadeWithLove: false,
		},
		locale: locale,
		dashboard: {
			component: compo.Dashboard,
			handler: dashboardHandler,
		},

		componentLoader,
	});

	const sessionStore = new MongoDBStore({
		uri: "mongodb+srv://admin:passwd@maincluster.5epli6n.mongodb.net/auth?retryWrites=true&w=majority", // MongoDB connection URI
		collection: "sessions", // Collection name for sessions
	});

	const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
		admin,
		{
			authenticate,
			cookieName: "cafeteriaSession",
			cookiePassword: "simple",
		},
		null,
		{
			// store: sessionStore,
			resave: true,
			saveUninitialized: true,
			secret: "simple",
			// cookie: {
			// 	httpOnly: process.env.NODE_ENV === "production",
			// 	secure: process.env.NODE_ENV === "production",
			// },
		}
	);
	app.use(admin.options.rootPath, adminRouter);

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
			new Usuari({ username: req.body.correu, nom: req.body.nom, saldo: 5 }),
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
