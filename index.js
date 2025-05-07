//Importa o módulo express
const express = require('express');

// Importando o módulo express
const app = express();
const produtos = [
  { id: 1, nome: 'Produto 1', preco: 10.0 },
  { id: 2, nome: 'Produto 2', preco: 20.0 },
  { id: 3, nome: 'Produto 3', preco: 30.0 },
  { id: 4, nome: 'Produto 4', preco: 40.0 }
];

// Configurando o middleware para analisar o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.host, req.method, req.url);
    next(); 
});

// Cria um manipulador da rota para a raiz da aplicação
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/claudio', (req, res) => {
  res.send('Cláudio Augusto Novaes Gontijo');
});

app.get('/ola', (req, res) => {
  let nome = req.query.nome;
  res.send(`Olá ${nome}`);
});

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    const { id, nome, preco } = req.body;
    const novoProduto = { id, nome, preco };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
})

//Inicializa o servidorna porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta http://localhost:3000');
});