import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },

    descricao: {
        type: String,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    estoque: {
        type: Number,
        required: true,
        default: 0
    },

    categoria: {
        type: String,
        required: true
    },

    imagem: {
        type: String

    },

    ativo: {
        type: Boolean,
        default: true
    },

    criadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;