const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let tok = req.header("auth-token");
  const token = tok.substr(7);

  if (!token) {
    return res.status(401).send("Access Denied..");
  }
  try {
    const verified = jwt.verify(token, "Developer_7_Shiva");
    //console.log(verified._id);
    req.user = verified._id;
    req.role = "doctor";
    next();
  } catch (err) {
    res.sendStatus(400, { message: "Invalid Token..." });
  }
};
