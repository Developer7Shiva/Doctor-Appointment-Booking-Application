const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let tok = req.header('auth-token');
    const token = tok.substr(7);
    if(!token) {
        return res.status(401).send("Access Denied..");
    }
    try {
        const verified = jwt.verify(token, 'Developer_7_Siva' );
        req.user = verified._id;
        next();
    } catch( err ) {
        res.status(400).send({"message":"Invalid Token"});
    }
};
