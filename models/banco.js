const Sequelize = require("sequelize")
const sequelize = new Sequelize("test", "root", "", {
    host: "localhost",
    dialect: "mysql"
})
module.exports  = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

sequelize.authenticate().then(function () {
    console.log("Conectado com sucesso")
}).catch(function (erro) {
    console.log("Falha ao conectar: " + erro)
})

const User = sequelize.define("Cliente", {
    inputNome: { type: Sequelize.STRING },    
    inputTelefone: { type: Sequelize.INTEGER },
    inputEmail: { type: Sequelize.TEXT },    
    inputAniversario: { type: Sequelize.DATEONLY }, 
    inputPassword: { type: Sequelize.TEXT }
})
const Agendamento = sequelize.define("reserva", {
    inputEmail: { type: Sequelize.TEXT },
    inputUnidade: { type: Sequelize.STRING },
    inputAmbiente: { type: Sequelize.STRING },      
    inputMesa: { type: Sequelize.INTEGER },
    inputLugares: { type: Sequelize.INTEGER },           
    inputDataReserva: { type: Sequelize.DATEONLY }, 
    inputHoraReserva: { type: Sequelize.TIME }
})
User.hasMany(Agendamento, { foreignKey: 'idCliente' });

//Agendamento.sync({ force: true })
//Agendamento.sync({ })


/*// EXx foreingKey
MainClient.hasOne(MainDashboard, { foreignKey: 'idClient', foreignKeyConstraint: true })
MainClient.hasOne(MainDashboard, { foreignKey: 'clientId' })
MainDashboard.belongsTo(MainClient, { foreignKey: 'clientId' })


// EXx foreingKey
const User = sequelize.define('user', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  firstName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false },
});

const Project = sequelize.define('project', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

// track which projects a user is associated with
const UserProject = sequelize.define('userProject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
// add user id foreign key to all projects
Project.belongsTo(User, { foreignKey: 'id_manager' });
User.hasMany(Project, { foreignKey: 'id_manager' });

// makes a join table between the users and projects
// 'through' key sets the name of the table: user_projects
User.belongsToMany(Project, { through: UserProject, foreignKey: 'id_user' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'id_project' });



async function addProject(userId, projectObj) {
  // find the user record
  const user = await User.findOne({ where: { id: userId } });
  // create the project
  const project = await Project.create(projectObj);
  // set the user (project manager) foreign key
  project.setUser(user);
}

async function joinUserProject(userId, projectId) {
  // find the user & project
  const user = await User.findOne({ where: { id: userId } });
  const project = await Project.findOne({ where: { id: projectId } });
  // add project and user to the join table with the custom method:
  project.addUser(user);
}

*///