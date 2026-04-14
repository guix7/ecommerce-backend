import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

async function getMeUser(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('ID inválido');
        error.status = 400;
        throw error;
    }

    const user = await User.findById(id).select('-senha');

    if(!user){
        const error = new Error('Usuário não encontrado');
        error.status = 404;
        throw error;
    }

    return user;
}

async function updateMe(id, updates){
    const user = await User.findByIdAndUpdate(
        id,
        updates,
        {new: true, runValidators: true}
    ).select('-senha');

    if(!user){
        const error = new Error('Usuário não encontrado');
        error.status = 404;
        throw error;
    }

    return user
}

async function updatePassword(id, senhaAtual, novaSenha){
    const user = await User.findById(id).select('+senha');

    if(!user){
        const error = new Error('usuário não encontrado');
        error.status = 404;
        throw error;
    }

    const senhaValida = await bcrypt.compare(senhaAtual, user.senha);

    if(!senhaValida){
        const error = new Error('Senha atual incorreta');
        error.status = 401;
        throw error;
    }

    const hash = await bcrypt.hash(novaSenha, 10);

    user.senha = hash;

    await user.save();

    return {message: 'Senha atualizado com sucesso!'};
};

async function deleteMe(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('Id inválido');
        error.status = 400;
        throw error;
    }

    const user = await User.findByIdAndDelete(id);

    if(!user){
        const error = new Error('Usuário não encontrado');
        error.status = 404;
        throw error;
    }

    return {message: 'Usuário apagado com sucesso'};
}

export {getMeUser, updateMe, updatePassword, deleteMe};