import env from 'dotenv';
import mongoose from "mongoose";

env.config()

const { MONGODB_URI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const Schema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d{2,3}-\d+$/.test(value);
            },
            message:
                'Invalid phone number format. Please use the format "123-4567890".',
        },
    },
});

Schema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = mongoose.model("Person", Schema);

export { connectDB, Person as default };

