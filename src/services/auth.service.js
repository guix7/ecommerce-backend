import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

async function register(data){
    const {nome, email, senha} = data;

    const emailExist = await User.findOne({email});

    if(emailExist){
        const erro = new Error('Usuário já cadastrado');
        erro.status = 409;
        throw erro;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await User.create({
        nome,
        email,
        senha: senhaHash
    });

    return {
        id: user._id,
        nome: user.nome,
        email: user.email
    }
}

async function login(data, res){
    const {email, senha} = data;

    function errorAuth(){
        const erro = new Error('Email ou senha inválidos');
        erro.status = 401;
        return erro;
    }

    const user = await User.findOne({email}).select('+senha');

    if(!user) throw errorAuth();

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if(!senhaValida) throw errorAuth();

    const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 
    });

    return {user: {
        id: user._id,
        nome: user.nome,
        email: user.email
    }}
}

async function esqueceuSenha(email){
    const user = await User.findOne({email});
    
    if(!user){
        const erro = new Error('Usuário não encontrado!');
        erro.status = 404;
        throw erro;
    }

    const resetarToken = crypto.randomBytes(20).toString('hex');

    user.senhaResetToken = crypto.createHash('sha256').update(resetarToken).digest('hex');
    user.expirarSenha = Date.now() + 3600000;

    await user.save();

    return resetarToken;
}

async function redefinirSenha(token, novaSenha){
    const tokenHasheado = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        senhaResetToken: tokenHasheado,
        expirarSenha: { $gt: Date.now() }
    });

    if(!user){
        const erro = new Error('Token inválido ou expirado!');
        erro.status = 400;
        throw erro;
    }

    user.senha = await bcrypt.hash(novaSenha, 10);
    user.senhaResetToken = undefined;
    user.expirarSenha = undefined;

    await user.save();
}

export {register, login, esqueceuSenha, redefinirSenha};