const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let tok = req.header("auth-token");
  const token = tok.substr(7);

  if (!token) {
    return res.status(401).send("Access Denied..");
  }
  try {
    const verified = jwt.verify(token, "Developer7Shiva");
    req.user = verified._id;
    // req.role = "patient";


    next();
  } catch (err) {
    res.sendStatus(400, { message: "Invalid Token..." });
  }
};
