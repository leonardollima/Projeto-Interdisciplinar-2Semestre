const db = require("./banco")

const agendamentos = db.sequelize.define('agendamento',{
    Nome: { type: db.Sequelize.STRING },
    Telefone: { type: db.Sequelize.INTEGER },
    origemSelect:   { type: db.Sequelize.STRING }, 
    dateTextInput: { type: db.Sequelize.DATEONLY }, 
    observacao: { type: db.Sequelize.TEXT }
})

//agendamentos.sync({ force: true })
module.exports = agendamentos