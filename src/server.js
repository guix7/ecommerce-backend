import dns from 'node:dns/promises'
import 'dotenv/config';
import app from './app.js';
import connectData from './database/database.js';

dns.setServers(['8.8.8.8'], ['0.0.0.0']);

const port = process.env.PORT || 3000;

async function startServer(){
    await connectData();

    app.listen(port, () =>{
        console.log(`Servidor rodando na porta ${port}`);
    })

}

startServer();


