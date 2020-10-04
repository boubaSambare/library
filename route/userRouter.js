import { Router } from "express";
import { usersModel } from "../model";

const router = Router();


/**
 * add a new user
 */
router.post('/', async (req, res) => {
    try {
        let newUser = await usersModel.create(req.body);
        res.status(201).send({ status: 'success', newUser });
    } catch (err) {
        res.status(500).send({ status: 'failed', error:err.message });
    }
});

/**
 * get all users with rented books.
 */
router.get('/',async (req, res) => {
    try {
        const users = await usersModel.find().populate('booksRented').exec();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ status: 'failed', error:err.message });
    }
});



export default router;