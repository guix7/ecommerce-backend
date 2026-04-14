import {getAllUsers, getUserById, deleteUser, updateUser} from "../services/admin.service.js";

async function getUsers(req, res, next){
    try{
        const users = await getAllUsers();

        return res.status(200).json(users)
    }catch(error){
        next(error)
    }
}

async function getUserId(req, res, next){
    try{
        const {id} = req.params
        const user = await getUserById(id);

        return res.status(200).json(user);
    }catch(error){
        next(error)
    }
}

async function deleteUs(req, res, next){
    try{
        const {id} = req.params;
        const user = await deleteUser(id);

        return res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

async function putUser(req, res, next){
    try{
        const { id } = req.params;

        const allowedFields = ['nome', 'email'];
        const updates = {};

        for(let key of allowedFields){
            if(req.body[key]){
                updates[key] = req.body[key];
            }
        }

        if(Object.keys(updates).length === 0){
            const error = new Error('Nenhum campo válido para atualização');
            error.status = 400;
            throw error;
        }

        const updatedUser = await updateUser(id, updates);

        return res.status(200).json({
            success: true,
            data: updatedUser
        });

    }catch(error){
        next(error);
    }

}
export {getUsers, getUserId, deleteUs, putUser};