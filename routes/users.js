const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')

router.get('/', async (req, res) => {
  await UserModel.find()
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

router.get('/:id', async (req, res) => {
  await UserModel.findById(req.params.id)
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

router.post('/', (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  user.save()
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

router.patch('/:id', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {
  await UserModel.deleteOne({
    _id: req.params.id
  })
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

module.exports = router
