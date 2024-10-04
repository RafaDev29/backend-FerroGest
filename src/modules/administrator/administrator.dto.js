const { check, validationResult } = require('express-validator');

const validateAdministratorDTO = [
    check('username')
        .exists().withMessage('Username is required')
        .isString().withMessage('Username must be a string'),
    check('password')
        .exists().withMessage('Password is required')
        .isString().withMessage('Password must be a string'),
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    check('hire_date')
        .exists().withMessage('Hire date is required')
        .isDate().withMessage('Hire date must be a valid date'),
    check('contact_phone')
        .exists().withMessage('Contact phone is required')
        .isString().withMessage('Contact phone must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), status: false });
        }
        next();
    }
];

module.exports = { validateAdministratorDTO };
