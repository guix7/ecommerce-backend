import mongoose from 'mongoose';
import User from '../models/user.js';

async function getAllUsers(){
    const users = await User.find()
    return users;
}

async function getUserById(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error("Id inválido");
        error.status = 400;
        throw error;
    }
    
    const user = await User.findById(id);

    if(!user){
        const erro = new Error('Usuário não encontrado!');
        erro.status = 404;
        throw erro;
    }
    return user
}

async function deleteUser(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('Id inválido');
        error.status = 400;
        throw error;
    }

    const user = await User.findByIdAndDelete(id);

    if(user.role === 'admin'){
        const error = new Error('Não é possivel apagar a conta admin');
        error.status = 403;
        throw error;
    }

    if(!user){
        const error = new Error('Usuário não encontrado');
        error.status = 404;
        throw error
    }

    return {
        success: true,
        message: "Usuário apagado com sucesso!",
        user
    }
}

async function updateUser(id, updates){
    const user = await User.findByIdAndUpdate(
        id,
        updates,
        {new: true, runValidators: true}
    );

    if(!user){
        const error = new Error('Usuário não encontrado');
        error.status = 404;
        throw error;
    }

    return user;
}

export  {getAllUsers, getUserById, deleteUser, updateUser};