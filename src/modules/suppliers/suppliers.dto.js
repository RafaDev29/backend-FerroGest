const { check, validationResult } = require('express-validator');

const validateSupplierDTO = [
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 255 }).withMessage('Name must be at most 255 characters'),
    check('contact')
        .exists().withMessage('Contact is required')
        .isString().withMessage('Contact must be a string')
        .isLength({ max: 100 }).withMessage('Contact must be at most 100 characters'),
    check('address')
        .exists().withMessage('Address is required')
        .isString().withMessage('Address must be a string')
        .isLength({ max: 255 }).withMessage('Address must be at most 255 characters'),
    check('phone')
        .exists().withMessage('Phone is required')
        .isString().withMessage('Phone must be a string')
        .isLength({ max: 15 }).withMessage('Phone must be at most 15 characters'),
    check('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), status: false });
        }
        next();
    }
];

module.exports = { validateSupplierDTO };
