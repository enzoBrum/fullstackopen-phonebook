import http from "http";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";

const server = http.createServer(app);

logger.info(`Connecting to ${config.MONGODB_URL}`);
mongoose.connect(config.MONGODB_URL).then(() => {
  logger.info("Connected to MongoDB");

  server.listen(config.PORT, () =>
    logger.info("Server listening in port ", config.PORT)
  );
});
