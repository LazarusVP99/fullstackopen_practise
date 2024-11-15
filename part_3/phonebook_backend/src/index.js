import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get("/", (_req, res) => res.send("<h1>Phonebook Backend</h1>"));
app.get("/api/persons", (_req, res) => res.json(persons));

app.get('/info', (_req, res) => res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
      </br>
    <p>${new Date()}</p>`));

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    const person = persons.find((person) => person.id === id);

    return person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    persons = persons.filter((person) => person.id !== id);

    return res.status(204).end();
})

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    const idGenerator = () =>
        Date.now().toString(36) + Math.random().toString(36).substring(2);
    const nameExists = persons.some(person =>
        person.name.toLowerCase() === name.toLowerCase()
    );

    if (!name || !number) {
        return res.status(400).json({
            error: "name or number is missing",
        });
    }

    if (nameExists) {
        return res.status(400).json({
            error: "name must be unique",
        });
    }

    persons = persons.concat({
        id: idGenerator().toString(),
        name,
        number,
    });

    res.status(201).json(persons);
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
