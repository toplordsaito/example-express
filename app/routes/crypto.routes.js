module.exports = app => {
  const cryptos = require("../controllers/crypto.controller.js");

  var router = require("express").Router();

  // Create a new Crypto
  router.post("/", cryptos.create);

  // Retrieve all Cryptos
  router.get("/", cryptos.findAll);

  // Retrieve a single Crypto with id
  router.get("/:id", cryptos.findOne);

  // Update a Crypto with id
  router.put("/:id", cryptos.update);

  // Delete a Crypto with id
  router.delete("/:id", cryptos.delete);

  // Delete all Cryptos
  router.delete("/", cryptos.deleteAll);

  app.use('/api/cryptos', router);
};
