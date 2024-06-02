const db = require('../db')

const Cad = db.sequelize.define('users',{
    name: {
        type: db.Sequelize.STRING(50)
    },
    email: {
        type: db.Sequelize.STRING(40)
    },
    salt: {
        type: db.Sequelize.STRING(12)
    },
    password: {
        type: db.Sequelize.STRING
    }
})

//Cad.sync({force: true})
module.exports = Cad