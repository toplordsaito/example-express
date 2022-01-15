module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.envDATABASE_USER,
  PASSWORD: process.envDATABASE_PASSWORD,
  DB: process.envDATABASE,
  dialect: process.envDATABASE_TYPE,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

