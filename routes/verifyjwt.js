const jwt = require('jsonwebtoken')

const verifyjwt = (req, res, next) => {
  const token = req.headers['access-token']
  if (!token) return res.send('Access denied')

  try {
    const verify = jwt.verify(token, process.env.SECRET)
    res.user = verify
    next()
  } catch (err) {
    res.status(401).send('Invalid Token')
  }
}

module.exports = verifyjwt