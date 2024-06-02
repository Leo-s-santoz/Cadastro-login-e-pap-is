const fs = require('fs');
const crypto = require('crypto');

// Função para gerar uma senha aleatória
function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Função para calcular a hash SHA-512 de uma string
function calculateSHA512(input) {
    return crypto.createHash('sha512').update(input).digest('hex');
}

// Nome do arquivo de saída
const outputFile = 'dicionario_senhas_fortes.txt';

// Criando e escrevendo no arquivo
fs.writeFileSync(outputFile, '');

// Gera senhas, calcula as hashes SHA-512 e escreve no arquivo
for (let i = 0; i < 1000000; i++) {
    const password = generateRandomPassword(5); // Gerar uma senha de 5 caracteres
    const hashedPassword = calculateSHA512(password); // Calcular a hash SHA-512 da senha
    fs.appendFileSync(outputFile, `${password}\n${hashedPassword}\n`); // Escrever senha e hash no arquivo
}

console.log('Dicionário de senhas gerado com sucesso!');

//Gerador senhas fracas
/*const fs = require('fs');
const SHA512 = require('crypto-js/sha512');

// Função para calcular o hash SHA-512
function calcularHash(numero) {
  return SHA512(numero.toString()).toString();
}

// Função para gerar todas as combinações numéricas e seus hashes
function gerarCombinações() {
  const limite = 100000;
  const nomeArquivo = 'dicionario_senhas_fracas.txt';

  // Abrir o arquivo para escrita
  const stream = fs.createWriteStream(nomeArquivo);

  for (let i = 0; i <= limite; i++) {
    const numeroFormatado = String(i).padStart(5, '0');
    const hash = calcularHash(numeroFormatado);
    const linha = `${numeroFormatado}\n${hash}\n`;

    // Escrever a linha no arquivo
    stream.write(linha);
  }

  // Fechar o arquivo após escrever todas as linhas
  stream.end();
}

// Chamar a função para gerar as combinações
gerarCombinações();*/