const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors=require("cors");

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/userDetailsDB', {
});


app.use(cors());


app.use(bodyParser.json());
// app.use(
//     cors({origin: ['http://localhost:3000']})
//    );
app.use('/api', userRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});