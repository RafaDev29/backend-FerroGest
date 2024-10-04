const { check, validationResult } = require('express-validator');

const validateProductDTO = [
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 255 }).withMessage('Name must be at most 255 characters'),
    check('description')
        .exists().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 255 }).withMessage('Description must be at most 255 characters'),
    check('category_id')
        .exists().withMessage('Category ID is required')
        .isInt().withMessage('Category ID must be an integer'),
    check('unit_of_measure')
        .exists().withMessage('Unit of measure is required')
        .isString().withMessage('Unit of measure must be a string')
        .isLength({ max: 50 }).withMessage('Unit of measure must be at most 50 characters'),
    check('quantity_available')
        .exists().withMessage('Quantity available is required')
        .isInt({ min: 0 }).withMessage('Quantity available must be a non-negative integer'),
    check('reorder_point')
        .exists().withMessage('Reorder point is required')
        .isInt({ min: 0 }).withMessage('Reorder point must be a non-negative integer'),
    check('supplier_id')
        .exists().withMessage('Supplier ID is required')
        .isInt().withMessage('Supplier ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), status: false });
        }
        next();
    }
];

module.exports = { validateProductDTO };
