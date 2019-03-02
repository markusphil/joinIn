const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {  //express middleware function profile
    const authHeader = req.get('Authorization');
    if (!authHeader){
        req.isAuth = false; //add new property to the request with value false
        return next(); //exit middleware and forward values
    }
    const token = authHeader.split('')[1]; //split header on whitespace (Bearer token) and acces Token
    if (!token || token === ''){ //check if token is not existent or empty
        req.isAuth = false; 
        return next();
    }
    //if there is an header with a not empty token, it shall be verifyed
    try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
    } catch (err){
        //exit if jwt fails
        req.isAuth = false; 
        return next();
    }
    if (!decodedToken) {
        //exit if token is invalid
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userUd = decodedToken.userId; //store userId to the request object
    next();
}