const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoute = require('./routes/user.route.js');
const itemRoute = require('./routes/item.route.js');

// Middleware
app.use(express.json());
app.use(cors());

// Env Constants
const port = process.env.PORT || 8000;
const uri = process.env.URI;

// DB connection setup
mongoose.connect(uri)
.then(() => console.log("DB connected successfully"))
.catch( (error) =>  { console.log(" DB connection unsuccesful " , error) });

// Routes
app.use('/item', itemRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Running on port : ${port}`);
})