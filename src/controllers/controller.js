import { createProduct } from "../services/services.js";

async function postProducts(req, res, next){
    try{
       
        const userId = req.user.id;
        const newProduct = await createProduct(req.body, userId);

        res.status(201).json(newProduct);
    }catch(error){
        next(error);
    }
}

export {postProducts};