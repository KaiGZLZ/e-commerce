import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import authMiddleware from './__helpers/authMiddleware'
import errorHandler from './__helpers/errorHandler'
const server = express()
require('dotenv').config()
//  Middlewares

server.use(cors())
server.use(express.json())

// Use JWT authentication to secure the API
server.use(authMiddleware)

// Principal Routes

server.use('/user', require('./controllers/user.controller'))
server.use('/products', require('./controllers/product.controller'))

// Global Error Handler
server.use(errorHandler)

//  SECTION TO CONNECTO WITH THE DATABASE

const URI = 'mongodb://localhost/e-comerce'

mongoose.connect(URI, {

})
    .then(_db => { console.log('DB is connected') })
    .catch(_err => { console.error('Database is Off') })

module.exports = mongoose

//  SECTION TO ACTIVATE THE SERVER

const PORT = process.env.PORT ?? 4000

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}....`)
})
