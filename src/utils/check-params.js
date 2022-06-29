
// check if the requires params are not missing
function checkParams(params) {
  return ((req, res, next) => {
    for(const param of params) {
      if(!param in req.body)
        return res.status(400).json({ message: "missing-params" })
      
      // clean whitespace
      params[param] = params[param]?.trim()
    }

    next()
  })
}

module.exports = checkParams
