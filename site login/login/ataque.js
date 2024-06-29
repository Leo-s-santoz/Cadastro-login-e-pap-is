const fs = require("fs");
const crypto = require("crypto");

// Função para gerar hash SHA-512 com salt
function gerarHashSenha(salt, senha) {
  const combinado = salt + senha;
  return crypto.createHash("sha512").update(combinado).digest("hex");
}

// Função de ataque de dicionário
function ataqueDicionario(usuarios, senhas) {
  usuarios.forEach((usuario) => {
    const { salt, hash: hashArmazenada } = usuario;
    let encontrada = false;

    senhas.forEach((senha) => {
      const hashTentada = gerarHashSenha(salt, senha);
      if (hashTentada === hashArmazenada) {
        console.log(
          `Senha encontrada para o usuário ${usuario.username}: ${senha}`
        );
        encontrada = true;
      }
    });

    if (!encontrada) {
      console.log(`Senha não encontrada para o usuário.`);
    }
  });
}

// Ler o arquivo de usuários
fs.readFile("banco.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo de usuários:", err);
    return;
  }

  // Parseando os dados do arquivo para obter os usuários
  const linhas = data
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0);
  const usuarios = linhas.map((linha) => {
    const campos = linha.split(",");
    return {
      id: parseInt(campos[0]),
      nomeUsuario: campos[1],
      email: campos[2],
      salt: campos[3],
      hash: campos[4],
    };
  });

  // Ler o arquivo de dicionário
  fs.readFile("dicionario.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo de dicionário:", err);
      return;
    }

    const senhas = data
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha.length > 0);
    ataqueDicionario(usuarios, senhas);
  });
});
