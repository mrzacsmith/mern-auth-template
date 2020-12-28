const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model.js')

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (user)
      return res.status(400).json({ error: 'Email has already been used' })

    const hashed_password = await bcrypt.hash(password, 10)
    user = new User({
      name,
      email,
      password: hashed_password,
    })

    await user.save()
    return res
      .status(201)
      .json({ message: `New user with added successfull`, id: user._id })
  } catch (error) {
    console.log(`Error:: ${error}`.red)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    user.password = undefined
    user.updatedAt = undefined
    user.__v = undefined
    return res.json({ token, user })
  } catch (error) {
    console.log(`Error:: ${error}`.red)
  }
})

module.exports = router
