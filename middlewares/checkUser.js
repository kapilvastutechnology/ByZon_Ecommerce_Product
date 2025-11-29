import jwt from 'jsonwebtoken';
export const checkUser = (req,res,next) =>{
    
    const token = req.headers.authorization;

    try{
       const decode = jwt.verify(token, 'secret');
       req.userId = decode.id;
       req.role = decode.role;
       next();
    }catch(err){
        return res.status(401).json({
            status: 'error',
            data: err.message
        })
    }
}


export const checkAdmin = (req,res,next) =>{
    if(req.role === 'admin') return next();
        return res.status(401).json({
            status: 'error',
            data: 'you are not authorised'
        });
    
}