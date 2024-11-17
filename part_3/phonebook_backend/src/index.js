import env from 'dotenv';
import express from "express";
import morgan from "morgan";
import errorMiddlewareHandler from './Middleware/middleware.js';
import Person, { connectDB } from "./Models/person.model.js";

env.config();

const app = express();

app.use(express.static("dist"));
app.use(express.json());

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

connectDB()

app.get("/", (_req, res) => res.send("<h1>Phonebook Backend</h1>"));

app.get("/api/persons", async (_req, res, next) => {
    try {
        const persons = await Person.find({});
        return res.json(persons);
    } catch (error) {
        next(error);
    }
});

app.get('/info', async (_req, res) => {
    const persons = await Person.find({})
    return res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
          </br>
        <p>${new Date()}</p>`)
})

app.get("/api/persons/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const person = await Person.findById(id);

        if (!person) return res.status(404)
            .json({ error: "Person not found" });

        return res.json(person);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/persons/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPerson = await Person.findByIdAndDelete(id);

        if (!deletedPerson) return res.status(404)
            .json({ error: "Person not found" });

        return res.status(204).end();
    } catch (error) {
        next(error);
    }
});

app.post("/api/persons", async (req, res, next) => {
    const { name, number } = req.body;

    try {
        const existingPerson = await Person.findOne({ name });

        if (existingPerson) return res.status(400)
            .json({ error: "name must be unique" });

        const person = new Person({
            name,
            number,
        });

        const savedPerson = await person.save();
        return res.status(201).json(savedPerson);
    } catch (error) {
        next(error);
    }
});

app.patch("/api/persons/:id", async (req, res, next) => {
    const { id } = req.params;
    const { number } = req.body;

    try {
        const updatedPerson = await Person.findByIdAndUpdate(
            id,
            { number },
            { new: true, runValidators: true, context: 'query' }
        );

        return res.json(updatedPerson);
    } catch (error) {
        next(error);
    }
});

app.use(errorMiddlewareHandler);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
