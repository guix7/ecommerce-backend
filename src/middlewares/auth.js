import jwt from 'jsonwebtoken'

function auth(req, res, next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            const erro = new Error("Token não fornecido");
            erro.status = 401;
            return next(erro);
        }

        const [scheme, token] = authHeader.split(' ');

        if(scheme !== "Bearer" || !token){
            const erro = new Error('Token mal formatado');
            erro.status = 401;
            return next(erro);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(error){
        error.status = 401;
        error.message = 'Token inválido'
        next(error)
    }
}

export default auth;