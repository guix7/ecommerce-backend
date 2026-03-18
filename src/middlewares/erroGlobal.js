function erroGlobal(erro, req, res, next){
    console.error(erro);

    if(process.env.NODE_ENV !== 'production'){
        console.error(erro);
    }

    const mensagem = erro.message || 'Erro interno do sistema';
    const status = erro.status || 500;


    res.status(status).json({message: mensagem});
}

export default erroGlobal;