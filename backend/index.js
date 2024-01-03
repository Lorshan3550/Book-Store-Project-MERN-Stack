import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT } from "./config";
import booksRoute from "./routes/booksRoute"
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();

const app = express();

//Middleware for parsing request body
app.use(express.json())

//Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors())

//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.use('/books', booksRoute)

const port = 5555;
const username = process.env.USER
const password = process.env.PASSWORD
const mongoDBURL =
  `mongodb+srv://${username}:${password}@cluster0.8jps59c.mongodb.net/books-collection?retryWrites=true&w=majority`;

//Make sure to include the current ip address to the corresponding mongoDB atlas database

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the MERN Stack Tutorial");
});



mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App connected to database")
    app.listen(port, () => {
        console.log(`App is listening to port ${port}`);
      });
      
})
.catch((error) => {
    console.log(error)
})
