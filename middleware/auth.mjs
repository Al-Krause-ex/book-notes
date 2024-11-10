import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    // Ожидаем формат "Bearer <token>"
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //Токен недействителен
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}
