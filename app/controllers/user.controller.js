const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {

  // hash the password provided by the user with bcrypt
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    if (await User.findOne({ where: { username: req.body.username } }) != null ){
      throw new Error('user is already exist');
    }

    // create a new user with the password hash from bcrypt
    let user = await User.create(
      Object.assign(req.body, { password: hash })
    );

    let data = await user.authorize();

    return res.json({token: data.authToken.token});

  } catch(err) {
    return res.status(400).send(err.message);
  }

};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send(
      'Request missing username or password param'
    );
  }

  try {

    let user = await User.authenticate(username, password)
    return res.json({token: user.authToken.token});

  } catch (err) {
    return res.status(400).send('invalid username or password');
  }

};

exports.logout = async (req, res) => {

  const { user } = req
  const authToken = req.headers.authorization

  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send()
  }

  return res.status(400).send(
    { errors: [{ message: 'not authenticated' }] }
  );
};

exports.profile = (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(404).send(
    { errors: [{ message: 'missing auth token' }] }
  );
};
