import { verify } from 'jsonwebtoken'; 
 

export default (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }

    try{
        const decoded = verify(token, process.env.SECRET); 
        req.user = decoded;
    } catch(error){
        res.status(401).send();
    }

    return next;
}