import jwt from 'jsonwebtoken'

function auth(req, res ,next){
    try{
        const token = req.cookies.token;

        if(!token){
            const erro = new Error("Token não fornecido ou sessão expirada");
            erro.status = 401;
            return next(erro);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }catch(error){
        error.status = 401;
        error.message = "Sessão inválida, faça login novamente";
        next(error);
    }
}

export default auth;