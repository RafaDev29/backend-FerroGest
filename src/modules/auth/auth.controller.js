const authService = require('./auth.service');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.login(username, password);

        if (user) {
            res.success('Login successful', user);
        } else {
            res.error('Invalid credentials', 401);
        }
    } catch (error) {
        res.error(error);
    }
};

module.exports = { login };
