require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
require('colors')

const connectDB = require('./utils/connectDB.js')
connectDB()

const userRouter = require('./routes/user-routes.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.use('/api/auth', userRouter)

const PORT = process.env.PORT || 5000

server.listen(PORT, () =>
  console.log(`\n** Server is listening on port ${PORT}`.america)
)
