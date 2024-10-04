const administratorService = require('./administrator.service');

const createAdministrator = async (req, res) => {
    try {
        const { username, password, name, hire_date, contact_phone } = req.body;
        const newAdmin = await administratorService.createAdministrator({ username, password, name, hire_date, contact_phone });
        res.success('Administrator created successfully', newAdmin);
    } catch (error) {
        res.error(error);
    }
};

const listAdministrators = async (req, res) => {
    try {
        const admins = await administratorService.listAdministrators();
        res.success('Administrators retrieved successfully', admins);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createAdministrator, listAdministrators };
