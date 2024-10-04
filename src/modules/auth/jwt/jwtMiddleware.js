const verifyToken = require('./jwtVerify');

const jwtMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.error('Authorization header missing', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.error('Invalid or expired token', 401);
    }
};

module.exports = jwtMiddleware;
