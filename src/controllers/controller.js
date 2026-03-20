import { createProduct, listProduct, listProductById, updateProduct, deleteProduct } from "../services/services.js";

async function postProducts(req, res, next){
    try{
       
        const userId = req.user.id;
        const newProduct = await createProduct(req.body, userId);

        res.status(201).json(newProduct);
    }catch(error){
        next(error);
    }
}

async function getProducts(req, res, next){
    try{
        const filters = req.query
        const showProduct = await listProduct(filters);

        res.status(200).json(showProduct);
    }catch(error){
        next(error);
    }
}

async function getProductsById(req, res, next){
    try{
        const {id} = req.params;
        const list = await listProductById(id);

        res.status(200).json(list);
    }catch(error){
        next(error);
    }
}

async function putProducts(req, res, next){
    try{
        const {id} = req.params;
        const update = await updateProduct(id, req.body);
    
        res.status(200).json(update);

    }catch(error){
        next(error);
    }
}

async function removeProduct(req, res, next){
    try{
        const {id} = req.params;
        const remover = await deleteProduct(id);

        res.status(200).json(remover);

    }catch(error){
        next(error)
    }
}
export {postProducts, getProducts, getProductsById, putProducts, removeProduct};