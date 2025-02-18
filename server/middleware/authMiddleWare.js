import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.token;
        // console.log(token);
        if(!token){
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({message: 'Invalid token'});
    }
}

export default verifyToken;