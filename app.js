const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv/config')
const app = express()


app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen('3001', () => {
  console.log('started: localhost:3001')
})

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log(err.message)
  console.log('started: mongoose')
})