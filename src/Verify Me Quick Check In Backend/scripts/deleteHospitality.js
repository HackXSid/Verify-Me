const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { logger } = require("../logger");
const { deleteHospitality } = require("../helpers/hospitality.crud");

const argv = yargs(hideBin(process.argv)).argv;

const app_id = argv.appId;

(async () => {
  await deleteHospitality(app_id);
  logger.info(`App Id : ${app_id}`);
})()
  .then(() => logger.info(`${app_id} deleted succesfully`))
  .catch((err) => logger.error(err.message));
