const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); // Expecting format: "Bearer <token>"
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
