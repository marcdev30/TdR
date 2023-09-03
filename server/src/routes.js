module.exports = () => {
  const express = require("express");
  const router = express.Router();
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
    console.log(req.body);
    if (
      req.body.producte !== null &&
      req.body.estat !== null &&
      req.body.comentaris !== null
    ) {
      console.log("Creating");
      const comanda = new Comanda({
        producte: req.body.producte,
        estat: req.body.estat,
        comentaris: req.body.comentaris,
      });
      comanda.save();
    }
  });

  return router;
};
