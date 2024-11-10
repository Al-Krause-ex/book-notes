import db from '../config/db.mjs';

class Note {
    static async create(bookId, userId, content) {
        return db.one(
            'INSERT INTO notes (book_id, user_id, content) VALUES ($1, $2, $3) RETURNING id, content',
            [bookId, userId, content]
        );
    }

    static async findByBookId(bookId, userId) {
        return db.any(
            'SELECT * FROM notes WHERE book_id = $1 AND user_id = $2 ORDER BY created_at DESC',
            [bookId, userId]
        );
    }

    static async update(noteId, userId, content) {
        return db.oneOrNone(
            'UPDATE notes SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING id, content',
            [content, noteId, userId]
        );
    }

    static async delete(noteId, userId) {
        return db.result('DELETE FROM notes WHERE id = $1 AND user_id = $2', [
            noteId,
            userId,
        ]);
    }
}

export default Note;
