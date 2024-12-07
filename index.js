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
  db.run(`CREATE TABLE IF NOT EXISTS reclamacoes (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    idade INTEGER,
    endereco TEXT,
    descricao TEXT
  )`);
});

// Endpoint para registrar reclamações
app.post('/reclamacoes', (req, res) => {
  const { nome, idade, endereco, descricao } = req.body;
  if (!nome || !idade || !endereco || !descricao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.run(
    'INSERT INTO reclamacoes (nome, idade, endereco, descricao) VALUES (?, ?, ?, ?)',
    [nome, idade, endereco, descricao],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao registrar reclamação' });
      }
      res.status(201).json({ message: 'Reclamação registrada com sucesso', id: this.lastID });
    }
  );
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

app.delete('/reclamacoes/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM reclamacoes WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover reclamação' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Reclamação não encontrada' });
    }
    res.status(200).json({ message: 'Reclamação removida com sucesso' });
  });
});

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
