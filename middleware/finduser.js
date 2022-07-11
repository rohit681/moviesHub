const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const secret = process.env.SEC;

const finduser = (req, res, next) => {
  const token = req.header("auth-token");
  // console.log(req.header("authToken"));
  if (!token) {
    return res.status(401).send({ error: "access denied" });
  }

  try {
    const data = jwt.verify(token, secret);
    req.user = data.user;
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(401).send({ error: "please enter a valid user" });
  }
};
module.exports = finduser;
