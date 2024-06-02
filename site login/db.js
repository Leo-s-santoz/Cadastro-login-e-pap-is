const Sequelize = require("sequelize");
//conexão com o banco
const sequelize = new Sequelize("cadastros", "root", "123456", {
    host: "localhost",
    dialect: "mysql"
});

//teste para saber se a conexão com o bd funcionou
sequelize.authenticate().then(function(){
    console.log("### Conectado ao banco ###")
}).catch(function(erro){
    console.log("Falha ao conectar: "+erro)
});
//exportação do módulo posts para que possa ser usado em outras páginas js
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}