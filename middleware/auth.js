const jwt = require("jsonwebtoken");
const config = require("config");

// basically a function that has access to the req/res cycle
//  the user in routes/api/user has the payload with user
//  this middleware checks to see whether that user has
//  a token, verifies it, and modifies req
module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check if there's a token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    // set req.user into the user in the token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
