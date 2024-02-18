const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({message: `Unauthorized, Invalid token.`})
        }
    }else{
        res.status(401).json({message: `Unauthorized, No token.`})
    }

}

module.exports = authMiddleware;