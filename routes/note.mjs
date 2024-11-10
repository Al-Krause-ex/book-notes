import express from 'express';
import { authenticateToken } from '../middleware/auth.mjs';
import Note from '../models/note.mjs';

const router = express.Router();

router.post('/:bookId', authenticateToken, async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    try {
        const note = await Note.create(bookId, userId, content);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failure create note' });
    }
});

router.get('/:bookId', authenticateToken, async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;

    try {
        const notes = await Note.findByBookId(bookId, userId);
        res.status(201).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failure fetched notes by book' });
    }
});

router.put('/:noteId', authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    try {
        const updatedNote = await Note.update(noteId, userId, content);

        if (!updatedNote) res.status(404).json({ error: 'Note not found' });
        res.status(201).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failure update note by book' });
    }
});

router.delete('/:noteId', authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const userId = req.user.id;

    try {
        const result = await Note.delete(noteId, userId);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Note not found' });
        }

        res.status(201).json({ message: 'Note succesfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failure update note by book' });
    }
});

export default router;
