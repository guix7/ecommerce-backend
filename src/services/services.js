import Product from "../models/products.js";

async function createProduct(data, userId){
    const {nome, descricao, preco, estoque, categoria, imagem} = data;

    if(preco < 0){
        const erro = new Error('Preço inválido');
        erro.status = 400;
        throw erro;
    }

    const productExist = await Product.findOne({
        nome,
        criadoPor: userId
    });

    if(productExist){
        const erro = new Error('Produto já cadastrado');
        erro.status = 400;
        throw erro;
    }
    
    const product = await Product.create({nome: nome.trim(),
        descricao,
        preco,
        estoque,
        categoria: categoria.toLowerCase(),
        imagem,
        criadoPor: userId
    });
    return  {
        id: product._id,
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,

    };
}

export {createProduct};