import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expressListEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
dotenv.config();
import { userRouter, bookRouter } from "./route"


mongoose.connect(
  process.env.MONGO_URI
  , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true

  }, () => console.log('db connected'));

const app = express();


app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use('/user',userRouter);
app.use('/book',bookRouter);

app.get('/test', (req, res) => {
  res.status(200).send('working');
});


console.table(expressListEndpoints(app));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});