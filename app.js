const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Connect to Database
db.connect();

const authRoute = require('./src/modules/auth/auth.routes')

app.use('/api/auth',authRoute );


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', status: false });
});


const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
