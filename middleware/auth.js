const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config({ path: "../config.env" });

function authMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res
      .status(404)
      .json({ message: "Authentication token is missing " });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving user" });
      }

      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      // Set user object on request for later use
      req.user = user;

      // Call next middleware
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}

module.exports = authMiddleware;
