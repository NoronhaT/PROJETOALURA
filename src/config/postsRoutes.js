import multer from 'multer';
import express from 'express';
import { listarPosts,postarNovoPost,uploadImagem ,atualizaNovoPost} from './controller/postController.js';
import { criarNovoPost } from './models/postModels.js';
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "./uploads",storage});

const routes = (app) => {
    // Permite que o Express interprete requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    //Rota para buscar todos os posts

    app.get('/posts',listarPosts);
    //Rota para buscar um post específico
    app.post('/posts',criarNovoPost)
    app.post('/upload',upload.single('imagem'), uploadImagem);

    app.put("/upload/:id",atualizaNovoPost);

}

export default routes;
// Importando o framework Express para criar e gerenciar o servidor

