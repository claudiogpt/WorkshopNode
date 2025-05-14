//Importa o módulo express
const express = require('express');
const app = express();
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

// Configurando o middleware para analisar o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configurando o middleware para servir arquivos estáticos
app.use(express.static('public'));

const routerAPI = express.Router();
app.use('/api', routerAPI);

routerAPI.get('/produtos', (req, res) => {
    knex.select('*').from('produtos')
      .then(produtos => {
        res.json(produtos);
      })
    res.json(produtos);
});

routerAPI.post('/produtos', (req, res) => {
    const novoProduto = {
      id: produtos.length + 1,
      nome: req.body.nome,
      preco: req.body.preco
    };

    knex('produtos').insert(novoProduto, ['id'])
      .then(dados => {
        let id = dados[0].id;
        novoProduto.id = id;
        res.status(201).json(novoProduto);
      })
      .catch(error => {
        console.error('Erro ao inserir produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' })
      });
});

routerAPI.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  produto.nome = req.body.nome;
  produto.preco = req.body.preco;

  res.json(produto);
});

routerAPI.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  produtos.splice(index, 1);
  res.status(204).send();
});

//Inicializa o servidorna porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta http://localhost:3000');
});