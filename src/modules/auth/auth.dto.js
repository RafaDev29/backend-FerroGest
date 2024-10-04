const { check, validationResult } = require('express-validator');

const validateAuthDTO = [
    check('username')
        .exists().withMessage('Username is required')
        .isString().withMessage('Username must be a string'),
    check('password')
        .exists().withMessage('Password is required')
        .isString().withMessage('Password must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), status: false });
        }
        next();
    }
];

module.exports = { validateAuthDTO };
