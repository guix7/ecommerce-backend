import {register, login, esqueceuSenha, redefinirSenha} from '../services/auth.service.js'

async function postRegister(req, res, next){
    try{
        const data = req.body;
        const user = await register(data);

        res.status(201).json(user);
    }catch(error){
        next(error);
    }
}

async function postLogin(req, res, next){
    try{
        const data = req.body;
        const user = await login(data, res);

    res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

async function postForgotSenha(req, res, next){
    try{
        const {email} = req.body;
        const token = await esqueceuSenha(email);

        return res.status(200).json({message: 'E-mail de recuperação enviado!', token});

    }catch(error){
        next(error);
    }
}

async function postResetSenha(req, res, next){
    try{
        const {token, senha} = req.body;
        await redefinirSenha(token, senha);

        return res.status(200).json({message: 'Senha alterada com sucesso'})

    } catch(error){
        next(error);
    }
}
export {postRegister, postLogin, postForgotSenha, postResetSenha};