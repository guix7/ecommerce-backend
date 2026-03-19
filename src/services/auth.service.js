import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

async function login(data){
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
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    return {token, user: {
        id: user._id,
        nome: user.nome,
        email: user.email
    }}
}

export {register, login};