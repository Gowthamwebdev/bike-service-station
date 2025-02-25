import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.token;
        console.log("middleware ",token);
        if(!token){
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("decoded ", decoded);
        next();
    }
    catch(err){
        res.status(401).json({message: 'Invalid token'});
    }
}

export default verifyToken;