const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SEKRET

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.cookies.token;

    if(!token){
        console.log('User is not authorized')
        return res.redirect('/login')
    }

    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch (error) {
    return res.status(401).json({ error: "User is not authorized" });
  }
};
