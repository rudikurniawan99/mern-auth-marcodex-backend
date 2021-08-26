require('dotenv').config('../.env')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const dbConnect = require('./config/db')
const router = require('./routes')
const path = require('path')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(express.static('public'))

dbConnect()
app.use('/api/v1/', router)




module.exports = app