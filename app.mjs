import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.mjs';
import bookRoutes from './routes/book.mjs';
import noteRoutes from './routes/note.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//Подключаем маршруты
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Book Notes API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
