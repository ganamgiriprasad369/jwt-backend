const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const auth = require('./routes/auth');
app.use('/', auth)



mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('mongoDB is connected successfully..')
})
.catch((err)=>{
    console.error('error occured', err.message);
})



const Port = process.env.PORT || 4000;
app.listen(Port, ()=>{
    console.log('server connected : http://localhost:4000');
})


