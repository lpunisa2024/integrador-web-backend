# Projeto-Integrador-Programa-o-Web - Reclamações Backend

Projeto Integrador: Programação Web - Disciplina 28130

Este é o backend do sistema de cadastro de reclamações. Ele foi desenvolvido utilizando **Node.js**, **Express** e **SQLite** para armazenar e gerenciar as reclamações enviadas pelo frontend.

## Funcionalidades

- API para cadastro de reclamações.
- API para listagem de reclamações armazenadas.
- Banco de dados SQLite simples e eficiente.

---

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 14 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)

---

## Como Executar

Siga os passos abaixo para configurar e executar o backend:

### 1. Clone o Repositório

Se você ainda não clonou o repositório, faça isso com o comando:
```bash
git clone <URL_DO_REPOSITORIO>
cd reclamacoes-backend
```

### 2. Instale as Dependências

No diretório do backend, instale as dependências necessárias com o comando:
```bash
npm install
```

### 3. Configure o Banco de Dados

O script automaticamente cria o banco de dados `reclamacoes.db` e configura a tabela necessária quando o backend é iniciado. Não há configurações adicionais de banco de dados.

### 4. Execute o Servidor

Inicie o servidor com o comando:
```bash
node index.js
```

O servidor será iniciado e estará disponível em:  
`http://localhost:3001`

---

## Endpoints Disponíveis

### **POST /reclamacoes**
Cadastra uma nova reclamação.

- **Exemplo de Requisição**:
  ```json
  {
    "descricao": "Minha reclamação sobre o serviço."
  }
  ```

- **Resposta de Sucesso**:
  ```json
  {
    "message": "Reclamação registrada com sucesso",
    "id": 1
  }
  ```

### **GET /reclamacoes**
Retorna todas as reclamações cadastradas.

- **Resposta de Sucesso**:
  ```json
  [
    {
      "id": 1,
      "descricao": "Minha reclamação sobre o serviço."
    },
    {
      "id": 2,
      "descricao": "Outra reclamação."
    }
  ]
  ```

---

## Estrutura do Projeto

```
reclamacoes-backend/
├── index.js         # Arquivo principal do servidor
├── package.json     # Configuração do projeto Node.js
├── reclamacoes.db   # Banco de dados SQLite
└── node_modules/    # Dependências do projeto
```

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para criação de servidores web.
- **SQLite**: Banco de dados leve e rápido.