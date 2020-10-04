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
    booksRented: [{ type: Schema.Types.ObjectId, ref: 'books' }]// serve per salvare tutte i libre che l'utente ha preso in prestito.
}, { timestamps: true });

export default model('user', userShema);