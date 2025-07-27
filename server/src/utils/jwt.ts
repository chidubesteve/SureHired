
const jwt = require('jsonwebtoken');

const generateToken = (payload: any) => { 
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token expiration time
    });
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification failed:', error);
        return null; // Return null if verification fails
    }
}

export { generateToken, verifyToken };