const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

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
app.use('/api/items', productRoute)

app.listen(port, () => {
    console.log(`Running on port : ${port}`);
})