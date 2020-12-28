const jwt = require('jsonwebtoken')

exports.requireLogin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decode
      next()
    } else {
      return res.status(403).json({ error: 'forbidden' })
    }
  } catch (error) {
    console.log('this is a useless middleware error message right now'.red)
  }
}
