import db from '../config/db.mjs';
import bcrypt from 'bcrypt';

class User {
    static async create(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return db.one(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );
    }

    // Метод для поиска пользователя по email
    static async findByEmail(email) {
        return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    }

    static async authenticate(email, password) {
        const user = await User.findByEmail(email);

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        return isPasswordCorrect ? user : null;
    }
}

export default User;
