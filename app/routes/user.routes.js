module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/register", users.register);

  // Login
  router.post("/login", users.login);

  // Logout
  router.delete("/logout", users.logout);

  // Get Profile from token
  router.get("/me", users.profile);

  app.use('/api/users', router);
};
