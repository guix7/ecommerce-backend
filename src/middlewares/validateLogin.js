import joi from 'joi';

const registerSchema = joi.object({
    nome: joi.string().min(3).required().messages({
        'string.empty': 'Nome é obrigatório',
        'string.min': 'Nome deve ter ao menos 3 caracteres'
    }),

    email: joi.string().email().required().messages({
        'string.empty': 'E-mail é obrigatório',
        'string.email' : 'Email inválido'
    }),

    senha: joi.string().min(6).required().messages({
        'string.empty': 'Senha é obrigatória',
        'string.min': 'Senha deve ter no mínimo 6 caracteres'
    })
})

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'E-mail é obrigatório',
        'string.email': 'Email inválido'
    }),

    senha: joi.string().min(6).required().messages({
        'string.empty': 'Senha é obrigatória',
        'string.min': 'Senha precisa de pelo menos 6 caracteres'
    })
})

function validateRegister(req, res, next){
    const {error} = registerSchema.validate(req.body, { abortEarly: false });

    if(error){
        const erro = new Error(error.details[0].message);
        erro.status = 400;
        return next(erro);
    }

    next();
}
function validateLogin(req, res, next){
    const {error} = loginSchema.validate(req.body, { abortEarly: false });

    if(error){
        const erro = new Error(error.details[0].message);
        erro.status = 400;
        return next(erro);
    }

    next();
}

export {validateLogin, validateRegister};