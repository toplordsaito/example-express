const db = require("../models");
const Crypto = db.cryptos;
const Wallet = db.wallets;
const Op = db.Sequelize.Op;

// Create and Save a new Crypto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Crypto
  const crypto = {
    title: req.body.title,
    value: req.body.value,
  };

  // Save Crypto in the database
  Crypto.create(crypto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Crypto."
      });
    });
};

// Retrieve all Cryptos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Crypto.findAll({ where: condition, include: Wallet })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cryptos."
      });
    });
};

// Find a single Crypto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Crypto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Crypto with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Crypto with id=" + id
      });
    });
};

// Update a Crypto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Crypto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Crypto was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Crypto with id=${id}. Maybe Crypto was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Crypto with id=" + id
      });
    });
};

// Delete a Crypto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Crypto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Crypto was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Crypto with id=${id}. Maybe Crypto was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Crypto with id=" + id
      });
    });
};

// Delete all Cryptos from the database.
exports.deleteAll = (req, res) => {
  Crypto.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cryptos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cryptos."
      });
    });
};