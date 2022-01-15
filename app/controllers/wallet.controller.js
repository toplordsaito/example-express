const db = require("../models");
const Wallet = db.wallets;
const Crypto = db.cryptos;

// Create and Save a new Wallet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Wallet
  const wallet = {
    title: req.body.title,
    balance: req.body.balance,
    UserId: req.body.UserId,
    cryptoId: req.body.cryptoId,
  };

  // Save Wallet in the database
  Wallet.create(wallet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wallet.",
      });
    });
};

// Retrieve all Wallets from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Wallet.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving wallets.",
      });
    });
};

// Find a single Wallet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Wallet.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Wallet with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Wallet with id=" + id,
      });
    });
};

// Update a Wallet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Wallet.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Wallet was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Wallet with id=${id}. Maybe Wallet was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Wallet with id=" + id,
      });
    });
};

// Delete a Wallet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Wallet.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Wallet was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Wallet with id=${id}. Maybe Wallet was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Wallet with id=" + id,
      });
    });
};

// Delete all Wallets from the database.
exports.deleteAll = (req, res) => {
  Wallet.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Wallets were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all wallets.",
      });
    });
};

exports.tranfer = async (req, res) => {
  // username of destination
  const dest_user = req.body.dest.username;
  const source_user = req.user;
  const dest = {
    wallet: await Wallet.findOne({
      where: { id: req.body.dest.walletId },
      include: Crypto,
    }),
  };
  const source = {
    wallet: await Wallet.findOne({
      where: { id: req.body.source.walletId },
      include: Crypto,
    }),
  };
  try {
    if (source.wallet.balance < req.body.amount) {
      throw new Error("balance is not enoght");
    }

    console.log("=============================");
    let balance = source.wallet.balance - req.body.amount;
    console.log(balance);
    Wallet.update(
      { balance },
      {
        where: { id: req.body.source.walletId },
      }
    )
      .then((num) => {
        if (num != 1) {
          res.send({
            message: `Cannot update Wallet with id=${id}. Maybe Wallet was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Wallet with id=" + id,
        });
      });

      const tranfer_rate = source.wallet.crypto.value / dest.wallet.crypto.value;
      balance = dest.wallet.balance + (req.body.amount * tranfer_rate);
      Wallet.update(
        { balance },
        {
          where: { id: req.body.dest.walletId },
        }
      )
        .then((num) => {
          if (num != 1) {
            res.send({
              message: `Cannot update Wallet with id=${id}. Maybe Wallet was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Wallet with id=" + id,
          });
        });
    

    return res.json(source.wallet);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
