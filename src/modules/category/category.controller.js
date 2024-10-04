const categoryService = require('./category.service');

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await categoryService.createCategory({ name, description });
        res.success('Category created successfully', newCategory);
    } catch (error) {
        res.error(error);
    }
};

const listCategories = async (req, res) => {
    try {
        const categories = await categoryService.listCategories();
        res.success('Categories retrieved successfully', categories);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createCategory, listCategories };
