module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
  
  Wallet.associate = function (User, Crypto) {
    Wallet.belongsTo(User);
    Wallet.belongsTo(Crypto);
  };

  return Wallet;
};