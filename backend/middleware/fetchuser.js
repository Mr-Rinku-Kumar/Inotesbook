const jwt = require("jsonwebtoken");
const JMT_SECRET = "Rinkuisagoodbo$y";

const fetchuser = (req, res, next) => {
  //Get the user from the JWT token and add Id to request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JMT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
