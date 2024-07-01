const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

const cors = require('cors');
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use('/uploads', express.static(__dirname + '/uploads'));

const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

// DB CONNECTION
const dbConnect = require('./config/database');
dbConnect();

// COOKIE PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// DEFINE ROUTES
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoutes');
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

