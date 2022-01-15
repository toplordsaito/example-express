const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cryptos = require("./Crypto.model.js")(sequelize, Sequelize);
db.authToken = require("./AuthToken.model.js")(sequelize, Sequelize);
db.users = require("./User.model.js")(sequelize, Sequelize);
db.wallets = require("./Wallet.model.js")(sequelize, Sequelize);

db.authToken.associate(db.users)
db.users.associate(db.authToken, db.wallets)
db.wallets.associate(db.users, db.cryptos)
db.cryptos.associate(db.wallets)

module.exports = db;
