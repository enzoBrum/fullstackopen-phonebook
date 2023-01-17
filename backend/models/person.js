import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', true)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                // tests for 01-123456... and 012-12345... patterns. The digits can be anything from 0 to nine.
                const regex = /^(?:\d{2}-\d{6,}|\d{3}-\d{5,})$/;
                return regex.test(v);
            },
            message: `Invalid phone number.\n
            Valid phone numbers have at least 8 digits and are formed of two parts
            separeted by -, where the first part has 2 or 3 digits.` 
        }
    },
});
personSchema.set('toJSON', {
    transform: (document, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
});
const Person = mongoose.model('Person', personSchema);

const url = process.env.MONGODB_URL;
console.log(`connecting to ${url}`)
const connect = () => {
    return (
        mongoose
            .connect(url)
            .then( ()=> console.log(`connected to MongDB`) )
            .catch( err => console.log(err.message) )
    );    
};


export default  { connect, Person };