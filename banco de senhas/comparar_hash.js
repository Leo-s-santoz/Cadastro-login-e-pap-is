const fs = require('fs');

// Função para ler as hashes do arquivo
function readHashesFromFile(filename) {
    const hashes = new Set();
    const lines = fs.readFileSync(filename, 'utf-8').split('\n');
    for (const line of lines) {
        const hash = line.trim();
        if (hash) {
            hashes.add(hash);
        }
    }
    return hashes;
}

// Comparar hashes e exibir relatório
function compareHashes(file1, file2) {
    const hashes1 = readHashesFromFile(file1);
    const hashes2 = readHashesFromFile(file2);

    console.log('Hashes encontradas no arquivo 1 que coincidem com o arquivo 2:');
    for (const hash of hashes1) {
        if (hashes2.has(hash)) {
            console.log(`Hash: ${hash}`);
        }
    }
}

// Arquivos a serem comparados
const arquivo1 = 'dicionario_senhas_fortes.txt'; // Arquivo gerado pelo script
const arquivo2 = 'banco_hash.txt'; // Arquivo do banco de dados

// Comparar hashes e exibir relatórionode 
compareHashes(arquivo1, arquivo2);