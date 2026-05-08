const express = require('express');
const path = require('path');
require('dotenv').config();

const connectDB = require("./config/db");
connectDB();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const indexRoute = require('./routes/index');
app.use('/', indexRoute);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});