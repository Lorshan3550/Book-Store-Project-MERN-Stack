import express, { request, response } from "express";
import { Book } from "../models/bookModel";

const router = express.Router()

//Route for Save a new Book
router.post('/', async (request, response) => {
    try{
      if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message : 'Send all required fields : title, author, publishYear'
        })
      }

      const newBook = {
        title : request.body.title,
        author : request.body.author,
        publishYear : request.body.publishYear
      }

      const book = await Book.create(newBook)

      return response.status(201).send(book)

    }
    catch(error){
      console.log(error.message)
    }
})

//Route for get All books from database
router.get('/', async (request, response) => {
  try{
    const books = await Book.find({})
    return response.status(200).json({
      count : books.length,
      data: books
    })
  } 
  catch(error){
    console.log(error)
    response.status(500).send({message : error.message})
  }
})

//Route for get One books from database by id
router.get('/:id', async (request, response) => {
  try{
    const {id} = request.params; // Path Parameters
    const book = await Book.findById(id)


    return response.status(200).json(book)
  } 
  catch(error){
    console.log(error)
    response.status(500).send({message : error.message})
  }
})

// Route for update a Book
router.put('/:id', async (request, response) => {
  try{
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message : 'Send all required fields : title, author, publishYear'
      })
    }

    const {id} = request.params

    const result = await Book.findByIdAndUpdate(id, request.body)  // Find by id and update using request body

    if(!result){
      return response.status(404).json({message : 'Book not found'})
    }

    return response.status(200).json({message : "Book updated successfully"})



  } catch(error){
    console.log(error.message)
    response.status(500).send({message : error.message})
  }
})


// Route for Delete a book
router.delete('/:id' , async (request, response) => {
  try{
    const {id} = request.params

    const result = await Book.findByIdAndDelete(id, request.body)  // Find by id and update using request body

    if(!result){
      return response.status(404).json({message : 'Book not found'})
    }

    return response.status(200).json({message : "Book deleted successfully"})
  } catch(error){
    console.log(error.message)
    response.status(500).send({message : error.message})
  }
})

export default router
