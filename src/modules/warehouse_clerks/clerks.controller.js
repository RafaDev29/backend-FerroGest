const clerkService = require('./clerks.service');

const createClerk = async (req, res) => {
    try {
        const { username, password, name, hire_date, shift, contact_phone, address } = req.body;
        const administratorId = req.user.id;
        
        const newClerk = await clerkService.createClerk({ username, password, name, hire_date, shift, contact_phone, address }, administratorId);
        res.success('Warehouse clerk created successfully', newClerk);
    } catch (error) {
        res.error(error);
    }
};

const listClerks = async (req, res) => {
    try {
        const administratorId = req.user.id;
        const clerks = await clerkService.listClerks(administratorId);
        res.success('Warehouse clerks retrieved successfully', clerks);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createClerk, listClerks };
