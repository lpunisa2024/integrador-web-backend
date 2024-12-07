const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./reclamacoes.db');

// Criar tabela de reclamações
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS reclamacoes (id INTEGER PRIMARY KEY, descricao TEXT)');
});

// Endpoint para registrar reclamações
app.post('/reclamacoes', (req, res) => {
  const { descricao } = req.body;
  if (!descricao) {
    return res.status(400).json({ error: 'Descrição é obrigatória' });
  }

  db.run('INSERT INTO reclamacoes (descricao) VALUES (?)', [descricao], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao registrar reclamação' });
    }
    res.status(201).json({ message: 'Reclamação registrada com sucesso', id: this.lastID });
  });
});

// Endpoint para listar reclamações
app.get('/reclamacoes', (req, res) => {
  db.all('SELECT * FROM reclamacoes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar reclamações' });
    }
    res.status(200).json(rows);
  });
});

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
