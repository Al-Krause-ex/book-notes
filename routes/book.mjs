import express from 'express';
import { authenticateToken } from '../middleware/auth.mjs';
import Book from '../models/book.mjs';

const router = express.Router();

router.post('/create', authenticateToken, async (req, res) => {
    const { title, description } = req.body;

    try {
        const book = await Book.create(req.user.id, title, description);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create book' });
    }
});

// Получение всех книг пользователя
router.get('/', authenticateToken, async (req, res) => {
    try {
        const books = await Book.findByUserId(req.user.id);
        res.status(201).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failure fetched books' });
    }
});

// Получение книги по ID
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id, req.user.id);

        if (!book) return res.status(404).json({ error: 'Book not found' });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failure get book by id' });
    }
});

// Обновление книги
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedBook = await Book.update(
            id,
            req.user.id,
            title,
            description
        );

        if (!updatedBook)
            return res.status(404).json({ error: 'Book not found' });

        res.status(201).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Failure update the book' });
    }
});

// Удаление книги
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Book.delete(id, req.user.id);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(201).json({ message: 'Book succesfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failure delete the book' });
    }
});

export default router;
