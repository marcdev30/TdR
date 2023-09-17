module.exports = () => {
  const cron = require("node-cron");

  const Comanda = require("../models/Comanda").default;
  const Producte = require("../models/Producte").default;

  cron.schedule("*/5 * * * * *", async () => {
    const comandes = await Comanda.find({}).populate("producte").exec();
    productes = comandes.map((comanda) => comanda.producte);

    const countMap = {};

    productes.forEach((producte) => {
      countMap[producte._id.toString()] =
        (countMap[producte._id.toString()] || 0) + 1;
    });

    // Convert the countMap into an array of objects
    const countArray = Object.entries(countMap).map(([producte, count]) => ({
      producte: producte.toString(),
      count,
    }));

    // Sort the countArray by count in descending order
    countArray.sort((a, b) => b.count - a.count);

    console.log((await Producte.findById(countArray[0].producte)).nom);
  });

  //   const allCrons = cron.listCrons();
  //   console.log(allCrons);
};
