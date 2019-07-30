const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
  console.log(req.body.token)
  const token = req.body.token;
  jwt.verify(token, 'secret_this_should_be_longer');
  next();
} catch (error) {
    res.status(401).json({message: " Auth failed! MiddleWare"});
  }
};
