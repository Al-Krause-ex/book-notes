import db from '../config/db.mjs';

class Book {
    static async create(userId, title, description) {
        return db.one(
            'INSERT INTO books (user_id, title, description) VALUES ($1, $2, $3) RETURNING id, title, description',
            [userId, title, description]
        );
    }

    static async findByUserId(userId) {
        return db.any('SELECT * FROM books WHERE user_id = $1', [userId]);
    }

    static async findById(bookId, userId) {
        return db.oneOrNone(
            'SELECT * FROM books WHERE id = $1 AND user_id = $2',
            [bookId, userId]
        );
    }

    static async update(bookId, userId, title, description) {
        return db.oneOrNone(
            'UPDATE books SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING id, title, description',
            [title, description, bookId, userId]
        );
    }

    static async delete(bookId, userId) {
        return db.result('DELETE FROM books WHERE id = $1 AND user_id = $2', [
            bookId,
            userId,
        ]);
    }
}

export default Book;
