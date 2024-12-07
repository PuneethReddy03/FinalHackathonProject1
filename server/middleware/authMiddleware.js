const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Grab token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });  // Token is missing or invalid
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });  // Token is invalid
    }
    req.user = user;  // Attach user information to the request object
    next();  // Move to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
