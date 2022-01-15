'use strict';

const express = require('express');
const customAuthMiddleware = require('./app/middleware/custom-auth-middleware');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// set use body json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customAuthMiddleware);

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to chomchob-test application." });
});

require("./app/routes/crypto.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/wallet.routes")(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
