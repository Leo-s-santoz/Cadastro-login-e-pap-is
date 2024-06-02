[instruções para a ferramenta de cadastro e login]
1 Para executar o código primeiro será necessária a instalação de um editor de código, para a criação foi utilizado o VSCode.

2 Também será necessária a instalação do Node.js, primeiro vá ao site do node e instale a última versão disponível, lembrando que o site tem uma aba com instruções específicas para instalação em Linux.

3 Agora com o node instalado deve ser feita a instalação de algumas NPMs que foram utilizadas para construção do backend em Node.js:
para fazer a instalação basta colar os seguintes códigos no terminal aberto na pasta do projeto:

npm install express
npm install sequelize
npm install body-parser

4 Para o banco será utilizado o mysql, sua instalação é simples, primeiro vá no site oficial do mysql e faça a instalação do "community edition".
	4.1 dentro do instalador instale a versão server only.
	4.2 na aba de "type and networking" deve ser escolhida a versão Development computer
	4.3 para windows é necessário fazer a ligação do mysql com o terminal para isso faça: painel de controle> sistema>configurações avançadas de sistema>variáveis de ambiente>Novo>adicione uma variável Path com o caminho da basta bin do seu mysql

5 Para o armazenamento das senhas será necessário a criação do banco de dados, para isso vá até o arquivo db.js e modifique as informações do banco na linha 3 a ordem é: ("nome do banco", "servidor", "senha de admin").
	5.1 agora que o mysql está instalado e conectado ao terminal, vá ao terminal e execute o comando 
	npm list
	devem aparecer os seguintes npms:

	├── body-parser@1.20.2
├── express-handlebars@7.1.2
├── express@4.19.1
├── mysql2@3.9.2
└── sequelize@6.37.1

6 Depois dessa configuração, vá ao arquivo Cad.js dentro da pasta modules, lá poderá ser definida o nome da table criada dentro do banco na linha 3, na linha 15 temos o código "Cad.sync({force: true})" ele deve ser executado apenas na primeira vez para a criação das tables, caso contrário todas as vezes que o programa rodar serão substituídas todas as informações, por isso recomendo que comente a linha depois da primeira vez.

7 Para a criação do banco abra o terminal e digite:
mysql -h(servidor) -u(usuário) -p (aperte enter e ele pedirá a sua senha de admin)
o projeto vem pré configurado como "mysql -h localhost -root -p"
depois de logar no mysql digite:
create database (nome do banco igual a o que está no arquivo db.js);.

8 Com o banco criado basta escrever o comando "node index.js" no terminal dentro da pasta do projeto. e ele estará rodando em localhost na porta 8081. Caso necessário a porta pode ser modificada na linha 54 do arquivo index.js.

9 Caso queira fazer alterações e testes no projeto é recomendado a instalação do npm nodemon com o código "npm install nodemon -g" e executar o index.js com nodemon ao invés de node "nodemon index.js", pois assim a cada alteração salva o servidor irá reiniciar automaticamente.

[instruções para utilização da geração e comparação de hash]

1 Para o funcionamento dos programas de criação de dicionário e comparação de hash será necessário apenas a instalação do npm crypto com o comando:
npm install crypto-js

2 Para a criação de novos arquivos dentro de gerar_senhas.js deve-se alterar o nome do arquivo criado na linha 21, sempre mantendo a extensão .txt

3 Na linha 28 deste mesmo arquivo pode ser alterada a quantidade de senhas e hash que serão gerados.

4 Nos dois arquivos de comparação de senhas pode-se ser alterado o arquivo para comparação nas linhas 30 e 31.

