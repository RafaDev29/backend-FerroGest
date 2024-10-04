const { check, validationResult } = require('express-validator');

const validateWarehouseEntryDTO = [
    check('product_id')
        .exists().withMessage('Product ID is required')
        .isInt().withMessage('Product ID must be an integer'),
    check('entry_date')
        .exists().withMessage('Entry date is required')
        .isDate().withMessage('Entry date must be a valid date'),
    check('quantity')
        .exists().withMessage('Quantity is required')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    check('supplier_id')
        .exists().withMessage('Supplier ID is required')
        .isInt().withMessage('Supplier ID must be an integer'),
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

module.exports = { validateWarehouseEntryDTO };
