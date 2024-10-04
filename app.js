const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./src/config/db');
const responseFormatter = require('./src/middleware/responseFormatter');
const authRoute = require('./src/modules/auth/auth.routes')
const administratorRoute= require('./src/modules/administrator/administrator.routes')
const clerksRoutes= require('./src/modules/warehouse_clerks/clerks.routes')
const categoriesRoutes= require('./src/modules/category/category.routes')

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(responseFormatter);

// Connect to Database
db.connect();



app.use('/api/v1',authRoute );
app.use('/api/v1', administratorRoute)
app.use('/api/v1', clerksRoutes)
app.use('/api/v1', categoriesRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', status: false });
});


const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
