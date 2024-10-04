const validateAuthDTO = (data) => {
    if (!data.username || typeof data.username !== 'string') {
        return { isValid: false, error: 'Username is required and must be a string' };
    }
    if (!data.password || typeof data.password !== 'string') {
        return { isValid: false, error: 'Password is required and must be a string' };
    }
    return { isValid: true };
};

module.exports = { validateAuthDTO };
