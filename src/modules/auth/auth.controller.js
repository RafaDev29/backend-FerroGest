const authService = require('./auth.service');
const { validateAuthDTO } = require('./auth.dto');

const login = async (req, res) => {
    try {
        const validation = validateAuthDTO(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.error, status: false });
        }

        const { username, password } = req.body;
        const result = await authService.login(username, password);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', status: false });
    }
};

module.exports = { login };
