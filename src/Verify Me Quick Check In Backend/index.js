const { app } = require("./app");
const { logger } = require("./logger");
const { assertDatabaseConnectionOk } = require("./models/validateDb");

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const PORT = process.env.PORT || 8000;

const setup = async () => {
  await assertDatabaseConnectionOk();
};

setup()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () =>
      logger.info(`Verify Me Quick Check In Server listening on Port ${PORT}`)
    );
  })
  .catch((err) => {
    logger.error(err);
  });
