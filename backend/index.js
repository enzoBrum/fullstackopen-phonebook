import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import db from "./models/person.js";
import morgan from "morgan";




const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError')
        return res.status(400).send({ error: 'malformatted id' })
    else if (err.name === 'ValidationError')
        return res.status(400).send({error: err.message})

    next(err)
}

const unknownEndpoint = (req, res) => res.status(404).send({error: 'unknown endpoint'})
                                

morgan.token( 'data', (req, res) => JSON.stringify(req.body) )

dotenv.config();
const app = express()
app.use(express.static('../frontend/build'))
app.use(express.json())
app.use(cors())
app.use(morgan( (tokens, req, res) => {
    let content = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ]
    if ( ["POST", "PATCH", "PUT"].includes(req.method) )
        content.push(tokens.data(req, res))

    return content.join(' ')

} ))

app.get('/info', (req, res) => {
    db.Person.estimatedDocumentCount().then(
        n => 
            res.status(200).send(
                `<p>Phonebook has info for ${n} people</p>\n` +
                `<p>${new Date()}</p>\n`
            )
    )
})

app.get('/api/persons', (req, res) => {
    db.Person.find({}).then(
        persons => res.status(200).json(persons)
    )
    .catch(e => console.log(e.message))
})


app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    db.Person.findById(id).then(
        person => {
            if (person)
                res.status(200).json(person);
            else
                res.status(404).end();
        }
    )
    .catch(
        err => next(err)
    )
})


app.delete('/api/persons/:id', (req, res, next) => {
    db.Person.findByIdAndDelete(req.params.id)
        .then(
            result => res.status(204).end()
        )
        .catch(err => next(err))
})


app.put('/api/persons/:id', (req, res, next) => {
    const {name, number} = req.body
    const person = {
        name: name,
        number: number
    }

    db.Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then( 
            p => res.status(200).json(p)
        )
        .catch(err => next(err))

})

app.post('/api/persons', (req, res, next) => {
    const person = req.body
    const newPerson = new db.Person(person);
    
    db.Person.find({ name: person.name })
        .then(p => {
            if (p[0])
                res.status(409).send({error: "A person with the same name already exists in the phonebook"})
            else 
            {
                newPerson
                    .save()
                    .then(
                        p => res.status(200).json(p)
                    )
                    .catch(
                        err => next(err)
            )}
        })
        .catch(err => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT =  process.env.PORT || 3001

// connect to db before app.listen() because cyclic says so
db
    .connect()
    .then(
        () => 
            app.listen(PORT, () => 
                console.log(`Server running on port ${PORT}`)
            )
    )

