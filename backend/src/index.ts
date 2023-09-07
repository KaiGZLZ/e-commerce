import express from 'express';
const server = express();
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config()

import authMiddleware from './__helpers/authMiddleware'
const errorHandler = require('./__helpers/errorHandler');


//  Middlewares

server.use(cors());
server.use(express.json())

// Use JWT authentication to secure the API
server.use(authMiddleware);


// Principal Routes

server.use('/user', require('./controllers/user.controller'));

// Global Error Handler
server.use(errorHandler);


//  SECTION TO CONNECTO WITH THE DATABASE

const URI = 'mongodb://localhost/users-list';

mongoose.connect(URI, {
  
})
    .then(_db => console.log('DB is connected'))
    .catch(_err => console.error('Database is Off'))

module.exports = mongoose;


//  SECTION TO ACTIVATE THE SERVER

const PORT = process.env.PORT  || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}....`);
});
