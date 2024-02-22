const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let secretKey = process.env.JWT_SECRET;
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Auth Header:", authHeader);
  if (!authHeader) {
    res.status(400).send({ message: "Authorization Not Provided" });
  } else {
    if (!authHeader.startsWith("Bearer")) {
      res.status(400).send({ message: "Invalid Authorization Format" });
    } else {
      token = authHeader.split(" ")[1];
      jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
          res.status(400).send({ message: "Error Verifying Token" });
        } else {
          console.log("Received Details: ", decode.user);
          req.user = decode.user;
          next();
        }
      });
    }
  }
};

module.exports = verifyToken;
