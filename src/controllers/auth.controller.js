import {register, login} from '../services/auth.service.js'

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
        const user = await login(data);

    res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

export {postRegister, postLogin};