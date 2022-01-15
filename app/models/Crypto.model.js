module.exports = (sequelize, Sequelize) => {
  const Crypto = sequelize.define("crypto", {
    title: {
      type: Sequelize.STRING,
      unique: true
    },
    value: {
      type: Sequelize.FLOAT
    }
  });

  Crypto.associate = function (Wallet) {
    Crypto.hasMany(Wallet);
  };

  return Crypto;
};
