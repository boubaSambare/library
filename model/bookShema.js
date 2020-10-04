import { Schema, model } from 'mongoose';

const bookShema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rented: { //  serve per sapere se un libro e stato prestato 
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default model('books', bookShema);