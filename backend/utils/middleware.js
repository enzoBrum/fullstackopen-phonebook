import logger from "./logger.js";

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError")
    return res.status(400).send({ error: "malformatted id" });
  else if (err.name === "ValidationError")
    return res.status(400).send({ error: err.message });

  next(err);
};

const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

const requestLogger = (req, res, next) => {
  logger.info(
    `Method: ${req.method}\n`,
    `Path: ${req.path}\n`,
    `Body: ${req.body}\n`,
    "-------------------------\n"
  );
  next();
};

export default { errorHandler, unknownEndpoint, requestLogger };
