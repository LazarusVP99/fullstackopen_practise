import mongoose, { connect, model, Schema } from 'mongoose';

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node src/mongo.js <password>')
    process.exit(1)
}

// Function to process MongoDB operations - either list all entries or add a new entry based on command line arguments
const processMongoDB = async () => {
    const password = process.argv[2];
    try {
        await connect(`mongodb+srv://vladvip8acc041022:${password}@fso.2i4uh.mongodb.net/?retryWrites=true&w=majority&appName=FSO`);
        console.log('Successfully connected to MongoDB');

        if (process.argv.length === 3) {
            // List all entries
            const personsList = await Person.find({});
            console.log("phonebook:");
            personsList.forEach((person) => {
                console.log(`${person.name} ${person.number}`)
            });
        } else if (process.argv.length === 5) {
            // Add new entry
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            });
            // save new entry
            await person.save();
            console.log(`added ${person.name} number ${person.number} to phonebook`);
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    } finally {
        console.log("MongoDB connection closed");
        await mongoose.connection.close();
    }
};

const personSchema = new Schema({
    name: String,
    number: String,
});

const Person = model('Person', personSchema);


processMongoDB();

