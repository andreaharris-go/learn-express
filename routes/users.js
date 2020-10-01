const express = require('express')
const router = express.Router()
const Joi = require('joi')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyjwt = require('./verifyjwt')

router.get('/token', (req, res) => {
  const token = jwt.sign({_id:123123}, process.env.SECRET)
  res.send(token)
})

router.get('/', verifyjwt, async (req, res) => {
  await UserModel.find()
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

router.get('/:id', async (req, res) => {
  await UserModel.findById(req.params.id)
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(6).required()
  })

  const { error } = schema.validate(req.body)
  
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  if (error) {
    res.send(error)
  } else {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    })
  
    user.save()
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
})

router.patch('/:id', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5),
    email: Joi.string().min(5).email(),
    password: Joi.string().min(6)
  })

  const { error } = schema.validate(req.body)
  
  if (error) {
    res.send(error)
  } else {
    await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          'name': req.body.name
        }
      }
    )
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
})

router.delete('/:id', async (req, res) => {
  await UserModel.deleteOne({
    _id: req.params.id
  })
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

module.exports = router
