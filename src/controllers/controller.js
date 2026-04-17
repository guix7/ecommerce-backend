import {
  createProduct,
  listProduct,
  byId,
  updateProduct,
  deleteProduct,
} from "../services/services.js";
import cloudinary from "../config/cloudinary.js";

async function postProducts(req, res, next) {
  try {
    const userId = req.user.id;
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newProduct = await createProduct(
      {
        ...req.body,
        imagem: imageUrl,
      },
      userId,
    );

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const user = req.user;
    const filters = req.query;
    const showProduct = await listProduct(filters, user);

    res.status(200).json(showProduct);
  } catch (error) {
    next(error);
  }
}

async function getProductsById(req, res, next) {
  try {
    const { id } = req.params;
    const list = await byId(id);

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

async function putProducts(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    let imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const update = await updateProduct(
      id,
      {
        ...req.body,
        ...(imageUrl && { imagem: imageUrl }),
      },
      userId,
    );

    res.status(200).json(update);
  } catch (error) {
    next(error);
  }
}

async function removeProduct(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const remover = await deleteProduct(id, userId, role);

    res.status(200).json(remover);
  } catch (error) {
    next(error);
  }
}
export {
  postProducts,
  getProducts,
  getProductsById,
  putProducts,
  removeProduct,
};
