const express = require("express");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");

const { logger } = require("./logger");
const { sanitiseInput } = require("./utils/sanitise");
const { router: hospitalityRouter } = require("./routes/hospitality.router");
const { router: userRouter } = require("./routes/user.router");
const { router: uidaiRouter } = require("./routes/uidai.router");

const app = express();

const corsOptions = {
  origin: function (_origin, callback) {
    // Allow Rest API Clients to be used for testing
    if (process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use("*", (req, _res, next) => {
  req.body = sanitiseInput(req.body);
  next();
});

app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/hospitality", hospitalityRouter);
app.use("/uidai", uidaiRouter);

/* eslint-disable no-unused-vars */
app.use(function (err, _req, res, _next) {
  logger.error(err);
  res.status(500).send({ error: "Oops: Something broke!" });
});
/* eslint-enable no-unused-vars */

module.exports = {
  app,
};
