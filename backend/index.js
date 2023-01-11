import express, { request, response } from "express";
import morgan, { token } from "morgan";
import cors from "cors";



const app = express()
morgan.token( 'data', (req, res) => JSON.stringify(req.body) )

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>\n` +
        `<p>${new Date()}</p>\n`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number( request.params.id)
    const person = persons.find( p => p.id === id)

    if (person)
        response.json(person)
    else
        response.status(404).end()
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( p => p.id !== id )
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if ( person.name && person.number && !persons.find(p=>p.name === person.name) )
    {
        person.id = Math.ceil( Math.random()*1e6 )
        persons.push(person)
        response.json(person)
    }

    else
    {
        let info;
        if (!person.name)
            info = "name is missing"
        else if (!person.number)
            info = "number is missing"
        else if ( persons.find(p=>p.name===person.name) )
            info = "The name already exists in the phonebook"
        
        response.status(400).json({
            error: info
        })
    }
})

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
