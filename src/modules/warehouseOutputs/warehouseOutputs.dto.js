const { check, validationResult } = require('express-validator');

const validateWarehouseOutputDTO = [
    check('product_id')
        .exists().withMessage('Product ID is required')
        .isInt().withMessage('Product ID must be an integer'),
    check('output_date')
        .exists().withMessage('Output date is required')
        .isDate().withMessage('Output date must be a valid date'),
    check('quantity')
        .exists().withMessage('Quantity is required')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    check('destination')
        .exists().withMessage('Destination is required')
        .isString().withMessage('Destination must be a string')
        .isLength({ max: 255 }).withMessage('Destination must be at most 255 characters'),
    check('reference_document')
        .optional()
        .isString().withMessage('Reference document must be a string')
        .isLength({ max: 100 }).withMessage('Reference document must be at most 100 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), status: false });
        }
        next();
    }
];

module.exports = { validateWarehouseOutputDTO };
