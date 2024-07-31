const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// const itemRoute = require('./routes/item.route.js')
const userRoute = require('./routes/user.route.js')
const itemRoute = require('./routes/item.route.js')

//Env Constants
const port = process.env.PORT || 8000;
const uri = process.env.URI;

//Middleware
app.use(express.json());

//DB connection setup
mongoose.connect(uri)
.then(() => console.log("DB connected successfully"))
.catch( (error) =>  { console.log(" DB connection unsuccesful " , error) });

// Routes
app.use('/item', itemRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Running on port : ${port}`);
})