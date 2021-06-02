const express = require("express");
const errorHandlers = require("./middleware/errorHandler");
const morgan = require("morgan");
// set up express app.
const app = express();
// wire up dotenv
require("dotenv").config();

// set up bodyParser middleware.
app.use(express.json());
// simple logging when hitting an endpoint.
app.use(morgan("combined"));

// initialize routes
app.use("/api", require("./routes/api"));

// error handling middleware
app.use(errorHandlers.errorHandler);

// listen for requests on port 4000
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});

module.exports = app;
