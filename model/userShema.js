import { Schema, model } from 'mongoose';

const userShema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    booksRented: [{ type: Schema.Types.ObjectId, ref: 'books' }]
}, { timestamps: true });

export default model('user', userShema);