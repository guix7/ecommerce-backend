function isAdmin(req, res, next){
    if(req.user.role !== 'admin'){
        const erro = new Error('Acesso negado');
        erro.status = 403;
        return next(erro)
    }

    next();
};

export default isAdmin;