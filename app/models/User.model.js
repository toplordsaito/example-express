const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = function (AuthToken, Wallet) {
    User.hasMany(AuthToken);
    User.hasMany(Wallet);
  };

  User.authenticate = async function (username, password) {
    const user = await User.findOne({ where: { username } });

    // bcrypt is a one-way hashing algorithm that allows us to
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error("invalid password");
  };

  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this;

    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    console.log(this.id);
    console.log(user);
    const authToken = await AuthToken.generate(this.id);

    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(authToken);
    return { user, authToken };
  };

  User.prototype.logout = async function (token) {
    // destroy the auth token record that matches the passed token
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  return User;
};
