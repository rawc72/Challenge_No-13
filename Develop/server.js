const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const { Category, Product, ProductTag, Tag } = require("./models");

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3002;

const syncAll = async () => {
  await sequelize.sync({ force: true });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
syncAll();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
