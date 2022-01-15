module.exports = app => {
  const wallets = require("../controllers/wallet.controller.js");

  var router = require("express").Router();

  // Create a new Crypto
  router.post("/", wallets.create);

  // tranfer
  router.post("/tranfer", wallets.tranfer);

  // Retrieve all Cryptos
  router.get("/", wallets.findAll);

  // Retrieve a single Crypto with id
  router.get("/:id", wallets.findOne);

  // Update a Crypto with id
  router.put("/:id", wallets.update);

  // Delete a Crypto with id
  router.delete("/:id", wallets.delete);

  // Delete all Cryptos
  router.delete("/", wallets.deleteAll);

  app.use('/api/wallets', router);
};
