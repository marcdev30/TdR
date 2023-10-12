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

// .env configuration
require("dotenv").config();

// Models
const Usuari = require("./models/Usuari").default;
const Producte = require("./models/Producte").default;
const Categoria = require("./models/Categoria").default;
const Comanda = require("./models/Comanda").default;

/**** Configuration ****/
const app = express();

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
    // other custom components
  };

  const uploadFeature = (await import("@adminjs/upload")).default;
  const localProvider = {
    bucket: "src/imatges",
    opts: {
      baseUrl: "/imatges",
    },
  };

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
            edit: { isAccessible: false, isVisible: false },
            new: { isAccessible: false, isVisible: false },
          },
        },
      },
      { resource: Comanda, options: { navigation: false } },
      {
        resource: Comanda,
        options: {
          id: "ComandesPendents",
          navigation: { name: "Comandes" },
          listProperties: ["usuari", "producte", "estat", "comentaris"],
          showProperties: [
            "usuari",
            "producte",
            "estat",
            "comentaris",
            "creada",
          ],
          filterProperties: ["usuari", "producte", "creada"],
          actions: {
            list: {
              after: async (response) => {
                // console.log(response.records);
                response.records = response.records.filter(
                  (record) => record.params.estat === "pendent"
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
                { value: "preparada", label: "Preparada" },
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
          id: "ComandesPreparades",
          navigation: { name: "Comandes" },
          listProperties: ["usuari", "producte", "estat", "comentaris"],
          actions: {
            list: {
              after: async (response) => {
                // console.log(response.records);
                response.records = response.records.filter(
                  (record) => record.params.estat === "preparada"
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
                { value: "preparada", label: "Preparada" },
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
              after: async (response) => {
                // console.log(response.records);
                response.records = response.records.filter(
                  (record) => record.params.estat === "entregada"
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
                { value: "preparada", label: "Preparada" },
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
          showProperties: ["nom", "preu", "descripcio", "file"],
          editProperties: ["nom", "preu", "descripcio", "file"],
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
              mimeTypes: [
                "image/png",
                "image/webp",
                "image/jpeg",
                "image/jpeg",
              ],
            },
          }),
        ],
      },
      {
        resource: Categoria,
        options: {
          navigation: {},
          listProperties: ["nom", "productes"],
          showProperties: ["nom", "descripcio", "productes"],
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
              mimeTypes: [
                "image/png",
                "image/webp",
                "image/jpeg",
                "image/jpeg",
              ],
            },
          }),
        ],
      },
    ],
    branding: {
      withMadeWithLove: false,
    },
    locale: {
      language: "es",
      availableLanguages: ["es"],
      translations: {
        es: {
          labels: {
            // Producte: "People",
            ComandesPendents: "Pendents",
            ComandesPreparades: "Preparades",
            ComandesEntregades: "Entregades",
            Usuari: "Usuaris",
            Producte: "Productes",
            Categoria: "Categories",
          },
          properties: {
            username: "Correu",
          },
          actions: {
            show: "Veure",
            delete: "Eliminar",
          },
          buttons: {
            save: "Desar",
          },
        },
      },
    },
    componentLoader,
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
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
      new Usuari({ username: req.body.correu, nom: req.body.nom, saldo: 0 }),
      req.body.contrasenya,
      function (err, user) {
        if (err) {
          console.log(err);
          res.redirect("/registre");
        } else {
          req.login(user, (err) => {
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
    req.logout((err) => {
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
