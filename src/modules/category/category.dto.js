const { check, validationResult } = require('express-validator');

const validateCategoryDTO = [
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
    check('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .isLength({ max: 255 }).withMessage('Description must be at most 255 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), status: false });
        }
        next();
    }
];

module.exports = { validateCategoryDTO };
