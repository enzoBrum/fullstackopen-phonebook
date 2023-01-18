import express from "express";
import Person from "../models/person.js";

const personRouter = express.Router();

personRouter.get("/", (req, res) => {
  Person.find({})
    .then((persons) => res.status(200).json(persons))
    .catch((e) => console.log(e.message));
});

personRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) res.status(200).json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

personRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

personRouter.put("/:id", (req, res, next) => {
  const { name, number } = req.body;
  const person = {
    name: name,
    number: number
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query"
  })
    .then((p) => res.status(200).json(p))
    .catch((err) => next(err));
});

personRouter.post("/", (req, res, next) => {
  const person = req.body;
  const newPerson = new Person(person);

  Person.find({ name: person.name })
    .then((p) => {
      if (p[0])
        res.status(409).send({
          error: "A person with the same name already exists in the phonebook"
        });
      else {
        newPerson
          .save()
          .then((p) => res.status(200).json(p))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

export default personRouter;
