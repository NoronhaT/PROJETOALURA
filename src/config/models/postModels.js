import 'dotenv/config';
import { ObjectId } from "bson";
import conectarAoBanco from "../db_config.js";
// Conectando ao banco de dados usando a string de conexão fornecida nas variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona que obtém postagens da coleção "postagens" no banco de dados MongoDB
export  async function getPosts() {
    // Seleciona o banco de dados "AulaAlura"
    const db = conexao.db("AulaAlura");
    // Acessa a coleção "postagens"
    const colecao = db.collection("postagens");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}


export async function criarNovoPost(novoPost) {
    const db = conexao.db("AulaAlura");
    const colecao = db.collection("postagens");
    return colecao.insertOne(novoPost);
}

export async function atualizaPost(id,novoPost) {
    const db = conexao.db("AulaAlura");
    const colecao = db.collection("postagens");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: novoPost});
}
