import userRoute from "../routes/user.route.js";
import { getMeUser, updateMe, updatePassword } from "../services/user.service.js";

async function getUserController(req, res, next) {
  try {
    const id = req.user.id;
    const user = await getMeUser(id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserController(req, res, next) {
  try {
    const id = req.user.id;

    const allowedFields = ["nome", "email"];
    const updates = {};

    for (let key of allowedFields) {
      if (req.body[key]) {
        updates[key] = req.body[key];
      }
    }

    if (req.body.senha) {
      const error = new Error("Use a rota de alteração de senha");
      error.status = 400;
      throw error;
    }

    if (Object.keys(updates).length === 0) {
      const error = new Error("Nenhum campo válido para atualização");
      error.status = 400;
      throw error;
    }

    const user = await updateMe(id, updates);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function updatePasswordController(req, res, next) {
    try{
       const id = req.user.id;
       const {senhaAtual, novaSenha} = req.body;

       if(!senhaAtual || !novaSenha){
        const error = new Error('Informe senha atual e nova senha!');
        error.status = 400;
        throw error;
       }

       const result = await updatePassword(id, senhaAtual, novaSenha);

       return res.status(200).json({
        succes: true,
        message: result.message
       })
    }catch(error){
        next(error);
    }
}

export { getUserController, updateUserController, updatePasswordController};
