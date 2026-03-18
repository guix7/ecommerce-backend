import mongoose from 'mongoose';

async function connectData(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Banco de dados conectado com sucesso');
    }catch(err){
        console.log('Falah ao conectar ao banco de dados', err.message);
    }
}

export default connectData;