const jwt = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa");

const jwksClient = jwksRsa({
  jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USERPOOL_ID}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("❌ No token provided.");
    return res.status(401).json({ error: "Token missing" });
  }

  console.log("🔐 Received token:", token.slice(0, 30), "...");

  jwt.verify(token, getKey, {
    // audience: process.env.COGNITO_CLIENT_ID,
    issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USERPOOL_ID}`,
    algorithms: ["RS256"],
  }, (err, decoded) => {
    if (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(403).json({ error: "Forbidden" });
    }
    console.log("✅ Token verified. Decoded payload:", decoded);
    req.user = decoded;
    next();
  });
};

