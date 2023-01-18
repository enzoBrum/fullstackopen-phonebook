import express from "express";
import Person from "../models/person.js";

const infoRouter = express.Router();

infoRouter.get("/info", (req, res) => {
  Person.estimatedDocumentCount().then((n) =>
    res
      .status(200)
      .send(
        `<p>Phonebook has info for ${n} people</p>\n` + `<p>${new Date()}</p>\n`
      )
  );
});

export default infoRouter;
