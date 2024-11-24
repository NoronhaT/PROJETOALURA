// Importando funções do modelo de postagens, que interagem com o banco de dados
import { getPosts, criarNovoPost,atualizaPost } from "../models/postModels.js";

// Importando o módulo 'fs' para manipulação de arquivos no sistema
import fs from "fs";

// Função para listar posts
export async function listarPosts(req, res) {
    // Obtém a lista de posts do banco de dados chamando a função `getPosts`
    const posts = await getPosts();

    // Retorna a lista de posts em formato JSON com status HTTP 200 (sucesso)
    res.status(200).json(posts);
}

import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    // Extrai os dados do novo post enviados no corpo da requisição
    const novoPost = req.body;

    try {
        // Chama a função `criarNovoPost` para salvar o post no banco de dados
        const postCriado = await criarNovoPost(novoPost);

        // Retorna o post recém-criado em formato JSON com status HTTP 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (error) {
        // Em caso de erro, exibe a mensagem no console
        console.error(error.message);

        // Retorna uma resposta com status HTTP 500 (erro interno do servidor) e uma mensagem de erro
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função para fazer upload de imagem associada a um post
export async function uploadImagem(req, res) {
    // Extrai os dados do novo post enviados no corpo da requisição
    const novoPost = req.body;

    try {
        // Salva os dados do post no banco de dados
        const postCriado = await criarNovoPost(novoPost);

        // Define o caminho onde a imagem será armazenada
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia/move o arquivo carregado para o caminho definido
        fs.renameSync(req.file.path, imagemAtualizada);

        // Retorna o post recém-criado com status HTTP 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem no console
        console.error(erro.message);

        // Retorna uma resposta com status HTTP 500 (erro interno do servidor) e uma mensagem de erro
        res.status(500).json({ "erro": "falha na requisição" });
    }
}

// Função para atualizar um post existente
export async function atualizaNovoPost(req, res) {
    // Extrai o ID do post enviado nos parâmetros da URL
    const id = req.params.id;

    // Define a URL da imagem com base no ID
    const urlImagem = `http://localhost:3000/uploads/${id}.png`;

    try {
        // Lê a imagem salva no diretório de uploads
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);

        // Gera uma descrição para a imagem usando uma função externa
        const descricaoGerada = await gerarDescricaoComGemini(imageBuffer);

        // Cria o objeto do post atualizado
        const post = {
            imgUrl: urlImagem,
            descricao: descricaoGerada || req.body.descricao, // Usa a descrição gerada ou a fornecida
            alt: req.body.alt,
        };

        // Atualiza o post no banco de dados
        const postAtualizado = await atualizaPost(id, post);

        // Retorna o post atualizado em formato JSON com status HTTP 200 (sucesso)
        res.status(200).json(postAtualizado);
    } catch (error) {
        // Em caso de erro, exibe a mensagem no console
        console.error("Erro ao atualizar o post:", error.message);

        // Retorna uma resposta com status HTTP 500 (erro interno do servidor) e uma mensagem de erro
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}