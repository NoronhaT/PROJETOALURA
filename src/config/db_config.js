// Importa o cliente MongoDB para realizar operações com o banco de dados
import { MongoClient } from "mongodb";

// Exporta uma função assíncrona que se conecta ao banco de dados usando uma string de conexão
export default async function conectarAoBanco(STRING_CONEXAO) {
    let mongoClient; // Declaração da variável que armazenará a instância do cliente MongoDB

    try {
        // Cria uma nova instância do MongoClient utilizando a string de conexão fornecida
        mongoClient = new MongoClient(STRING_CONEXAO);
        console.log("Conectando ao banco de dados...");

        // Aguarda a conexão com o banco de dados ser estabelecida
        await mongoClient.connect();
        console.log("Conectado ao banco de dados!");

        // Retorna o cliente MongoDB conectado para ser usado em outras partes da aplicação
        return mongoClient;
    } catch (error) {
        // Captura e exibe qualquer erro que ocorrer durante o processo de conexão
        console.error("Erro ao conectar ao banco de dados:", error);

        throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
}
