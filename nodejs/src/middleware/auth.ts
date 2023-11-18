import jwt from "jsonwebtoken";
// var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try
    {
        const token = req.header("x-access-token");

        if ( !token )
            throw Error( "Access Denied: No token provided" );

        const tokenDetails = jwt.verify( token, process.env.ACCESS_TOKEN_PRIVATE_KEY );

        req.user = tokenDetails;
        next();
    }
    catch ( err : any )
    {
        res.status(403).json({
            error   : true,
            message : err.message || err
        });
    }
};

export { auth };
