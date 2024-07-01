const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    return mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log('Database connection error:', err);
        process.exit(1);
    });
}

module.exports = dbConnect;
