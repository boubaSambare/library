import { Router } from "express";
import { booksModel, usersModel } from "../model";

const router = Router();

/**
 * get all books
 */
router.get('/', async (req, res) => {
    try {
        const books = await booksModel.find({});
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send({ status: 'failed', error: err.message });
    }
});

/**
 * add a new book
 */
router.post('/', async (req, res) => {
    try {
        let newBook = await booksModel.create(req.body);
        res.status(201).send({ status: 'success', newBook });
    } catch (err) {
        res.status(500).send({ status: 'failed', error: err.message });
    }
});


/**
 * edit a  book
 */
router.put('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        const checkIfBookExist = await booksModel.findById(bookId);
        if (!checkIfBookExist)
            return res.status(404).send({ status: 'NOT FOUND', message: 'book not found' });

        const updaptedBook = await booksModel.findByIdAndUpdate(bookId, req.body, { new: true });

        res.status(201).send({ status: 'success', book: updaptedBook });

    } catch (err) {
        res.status(500).send({ status: 'failed', error: err.message });
    }

});


/**
 * delete a book
 */
router.delete('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        const checkIfBookExist = await booksModel.findById(bookId);
        if (!checkIfBookExist)
            return res.status(404).send({ status: 'NOT FOUND', message: 'book not found' });
        await booksModel.findByIdAndDelete(bookId);

        res.status(200).send({ status: 'success', message: `book with the id ${bookId} deleted` });

    } catch (err) {
        res.status(500).send({ status: 'failed', error: err.message });
    }
});

/**
 * rent endpoint
 */

router.post('/rent/:bookId/:userId', async (req, res) => {
    const { bookId, userId } = req.params;
    console.log(req.body)
    try {
        const book = await booksModel.findById(bookId);
        if (book.rented)
            return res.status(405).send({ status: 'NOT ALLOWED', message: `book with the title ${book.title} already rented` });
        // the rent process 
        await booksModel.findByIdAndUpdate(bookId, { rented: true });
        await usersModel.findByIdAndUpdate(userId, { $push: { booksRented: bookId } });

        res.send({status:'success',message:`book with title ${book.title} succefully rented`});

    } catch (err) {
        res.status(500).send({ status: 'failed', error: err.message });
    }

});



export default router;