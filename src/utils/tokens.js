const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

// generate token
const get = (email) => jwt.sign({ email }, secret)

// verify token
function auth() {
  return ((req, res, next) => {
    try {
      const token = req.header("X-Auth-Token")
      const decoded = jwt.verify(token, secret)
      
      req.body.email = decoded.email
      next()
    } catch {
      res.json({ message: "invalid-token" })
    }
  })
}

module.exports = { get, auth }
