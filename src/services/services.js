import mongoose from "mongoose";
import Product from "../models/products.js";

async function createProduct(data, userId) {
  const { nome, descricao, preco, estoque, categoria, imagem } = data;

  if (preco < 0) {
    const erro = new Error("Preço inválido");
    erro.status = 400;
    throw erro;
  }

  const productExist = await Product.findOne({
    nome,
    criadoPor: userId,
  });

  if (productExist) {
    const erro = new Error("Produto já cadastrado");
    erro.status = 400;
    throw erro;
  }

  const product = await Product.create({
    nome: nome.trim(),
    descricao,
    preco,
    estoque,
    categoria: categoria.toLowerCase(),
    imagem,
    criadoPor: userId,
  });
  return {
    id: product._id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
  };
}

async function listProduct(filters) {
  const { maxPreco, minPreco, categoria } = filters;

  const query = {};

  if (maxPreco || minPreco) {
    query.preco = {};

    if (maxPreco) {
      query.preco.$lte = Number(maxPreco);
    }

    if (minPreco) {
      query.preco.$gte = Number(minPreco);
    }
  }

  if (categoria) {
    query.categoria = categoria.toLowerCase();
  }

  const products = await Product.find(query);

  return products.map((product) => ({
    id: product._id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
  }));
}

async function listProductById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const erro = new Error("id inválido");
    erro.status = 400;
    throw erro;
  }

  const product = await Product.findById(id);

  if (!product) {
    const erro = new Error("Produto não encontrado");
    erro.status = 404;
    throw erro;
  }

  return {
    id: product._id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
  };
}

async function updateProduct(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const erro = new Error("Id inválido");
    erro.status = 400;
    throw erro;
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

  if(!product){
    const erro = new Error('Produto não encontrado');
    erro.status = 404;
    throw erro;
  }

  return {
    id: product._id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
    categoria: product.categoria
  };
}

async function deleteProduct(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const erro = new Error('Id inválido');
        erro.status = 400;
        throw erro;
    }

    const product = await Product.findByIdAndDelete(id);

    if(!product){
        const erro = new Error('Produto não encontrado');
        erro.status = 404;
        throw erro;
    }

    return {
        message: 'Produto removido com sucesso!'
    }
}

export { createProduct, listProduct, listProductById, updateProduct, deleteProduct};
