import express from 'express';
import Book from './book.model.js';
import { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } from './book.controller.js';
import verifyAdminToken from '../middleware/verifyAdminToken.js';

const router = express.Router();

// post a book
router.post('/create-book', verifyAdminToken, postABook);

// get all books
router.get('/', getAllBooks);

// single book endpoint
router.get('/:id', getSingleBook);

// update a book endpoint
router.put('/edit/:id', verifyAdminToken, UpdateBook);

router.delete('/:id', verifyAdminToken, deleteABook);

export default router;
