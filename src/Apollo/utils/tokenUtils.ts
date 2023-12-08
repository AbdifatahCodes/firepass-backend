import { sign, verify } from 'jsonwebtoken';

const SECRET_KEY = 'my_secret_key'; // Replace with your actual secret key

export const createNewToken = (userId: string) => {
    return sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const validateUserToken = (token: string) => {
    try {
        return verify(token, SECRET_KEY);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired. Please login again.');
        }
        throw new Error('Invalid token. Please login again.');
    }
};
