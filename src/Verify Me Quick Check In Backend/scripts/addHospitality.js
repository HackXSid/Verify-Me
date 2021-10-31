const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { logger } = require("../logger");
const { createHospitality } = require("../helpers/hospitality.crud");

const argv = yargs(hideBin(process.argv)).argv;

const name = argv.name;
const url = argv.url;

(async () => {
  await createHospitality(name, url);
  logger.info(`Name : ${name}`);
})()
  .then(() => logger.info(`${name} added succesfully`))
  .catch((err) => logger.error(err.message));
