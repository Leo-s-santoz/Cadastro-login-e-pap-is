const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const Cad = require("./modules/Cad");
const genetateRandomSalt = require("./modules/generateRandomSalt");
//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//rotas
app.use(express.static("./"));

//rota de cadastro
let salt = "";
app.post("/add", function (req, res) {
  Cad.create({
    name: req.body.name,
    email: req.body.email,
    salt: (salt = genetateRandomSalt()),
    password: salt + req.body.password,
  }).catch(function (erro) {
    res.send("Houve um erro: " + erro);
  });
});

//rota carregar arquivo
app.get("/loadFile", (req, res) => {
  const filePath = path.join(__dirname, "file.txt"); // Caminho do arquivo
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao carregar o arquivo:", err);
      return res.status(500).json({ error: "Erro ao carregar o arquivo" });
    }
    res.send(data); // Envia o conteúdo do arquivo como resposta
  });
});

//rota para salvar o arquivo
app.post("/saveFile", (req, res) => {
  const content = req.body.content;
  const filePath = path.join(__dirname, "file.txt"); // Caminho do arquivo
  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Erro ao salvar o arquivo:", err);
      return res.status(500).json({ error: "Erro ao salvar o arquivo" });
    }
    res.sendStatus(200); // Envia uma resposta de sucesso
  });
});

//rota pegar ID
app.post("/getId", async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar o ID do usuário pelo email no banco de dados
    const user = await Cad.findOne({ where: { email: email } });

    if (user) {
      // Se o usuário for encontrado, retornar o ID
      res.json({ userId: user.id });
    } else {
      // Se nenhum usuário for encontrado com o email especificado
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//rota tarefas
app.get("/tarefas", (req, res) => {
  res.sendFile(path.join(__dirname, "site tarefas", "index.html"));
});

//rota checar papel
app.get("/check", (req, res) => {});

//rota de login
app.post("/login", async (req, res) => {
  try {
    // Buscar o usuário pelo email fornecido
    const cadastro = await Cad.findOne({ where: { email: req.body.email } });
    console.log("cadastro", cadastro);
    if (cadastro) {
      // Comparar a senha fornecida com a senha armazenada no banco de dados
      if (cadastro.password == cadastro.salt + req.body.password) {
        // Senha válida, login bem-sucedido
        console.log(
          "comp",
          cadastro.password == cadastro.salt + req.body.password
        );
        res.status(200).send("Login bem-sucedido!");
      } else {
        // Senha inválida
        const error = new Error("Senha invalida");
        res.status(401).json({ error: error.message });
      }
    } else {
      return res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).send("Erro interno do servidor");
  }
});

//definida a porta do localhost
app.listen(3036, function () {
  console.log("### Servidor rodando ###");
});
