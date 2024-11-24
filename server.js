// Importando o framework Express para criar e gerenciar o servidor
import express from 'express';
import routes from './src/config/postsRoutes.js';

// Criando uma instância do aplicativo Express
const app = express();

app.use(express.static("uploads"));
routes(app);

// Configurando o servidor para escutar na porta 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});



