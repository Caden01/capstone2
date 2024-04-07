const express = require("express");
const { NotFoundError } = require("./expressError");
const countriesRoutes = require("./routes/countries");

const app = express();

app.use(express.json());

app.use("/countries", countriesRoutes);

// Handles 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Any unhandled error gets dealt with here
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
