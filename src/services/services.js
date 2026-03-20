import mongoose from "mongoose";
import Product from "../models/products.js";

async function createProduct(data, userId) {
  const { nome, descricao, preco, estoque, categoria, imagem } = data;

  if (typeof preco !== 'number' || preco < 0) {
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
    categoria: categoria?.toLowerCase(),
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

async function listProduct(filters, user) {
  const { page = 1, limit = 10, maxPreco, minPreco, categoria, nome} = filters;

  const query = {};

  if(user.role !== 'admin'){
    query.criadoPor = user.id;
  }

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

  if(nome && nome.trim() !== ''){
    query.nome = new RegExp(nome.trim(), 'i');
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  const total = await Product.countDocuments(query);

  return {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    data: products.map((product) => ({
      id: product._id,
      nome: product.nome,
      preco: product.preco,
      descricao: product.descricao,
    })),
  };
}
async function byId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const erro = new Error("id inválido");
    erro.status = 400;
    throw erro;
  }

  const product = await Product.findById(id);

  if (!product) {
    const erro = new Error("Produto não encontrado ou não autorizado");
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

async function updateProduct(id, data, userId) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const erro = new Error("Id inválido");
    erro.status = 400;
    throw erro;
  }

  const product = await Product.findOneAndUpdate(
    {
      _id: id,
      criadoPor: userId,
    },
    data,
    { new: true, runValidators: true },
  );

  if (!product) {
    const erro = new Error("Produto não encontrado ou não autorizado");
    erro.status = 404;
    throw erro;
  }

  return {
    id: product._id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
    categoria: product.categoria,
  };
}

async function deleteProduct(id, userId, role) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const erro = new Error("Id inválido");
    erro.status = 400;
    throw erro;
  }

  let query = {_id: id};

  if(role !=='admin'){
    query.criadoPor = userId
  }

  const product = await Product.findOneAndDelete(query);

  if (!product) {
    const erro = new Error("Produto não encontrado ou não autorizado");
    erro.status = 404;
    throw erro;
  }

  return {
    message: "Produto removido com sucesso!",
  };
}

export { createProduct, listProduct, byId, updateProduct, deleteProduct };
