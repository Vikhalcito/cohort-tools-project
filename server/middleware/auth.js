const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const secret = process.env.JWT_SECRET || "supersecret_jwt_key"; // use env variable in prod

// Middleware to protect routes and decode token
const authenticate = expressJwt({
  secret,
  algorithms: ["HS256"],
  requestProperty: "auth",  // decoded token will be in req.auth
});

// Function to sign a JWT token for a user
function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    secret, 
    { expiresIn: "1d" }
  );
}

module.exports = { authenticate, signToken };
