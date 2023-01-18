import express from "express";
import cors from "cors";
import middleware from "./utils/middleware.js";
import personRouter from "./controllers/person.js";
import infoRouter from "./controllers/info.js";

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/persons", personRouter);
app.use("", infoRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
