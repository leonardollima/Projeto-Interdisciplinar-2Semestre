const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("home_reservas")
})
app.get("/cadastro", function (req, res) {
    res.render("cadastro")
})
app.get("/reserva", function (req, res) {
    res.render("reserva")
})
app.get("/consulta", function (req, res) {
    post.findAll().then(function (post) {
        res.render("consulta", { post })
        console.log(post)
    }).catch(function (erro) {
        res.send("Falha ao carregar dados: " + erro)
    })

})

app.post("/cadastrar", function (req, res) {
    post.create({
        inputNome: req.body.inputNome,
        inputTelefone: req.body.inputTelefone,
        inputEmail: req.body.inputEmail,        
        inputAniversario: req.body.inputAniversario,
        inputPassword: req.body.inputPassword

    }).then(function () {
        res.redirect("/")
    }).catch(function (erro) {
        res.send("Falha ao cadastrar dados: " + erro)
    })
})

app.post("/reservar", function (req, res) {
    post.create({
        inputEmail: req.body.inputEmail,        
        inputAmbiente: req.body.inputAmbiente,
        inputUnidade: req.body.inputUnidade,  
        inputMesa: req.body.inputMesa,
        inputLugares: req.body.inputLugares,      
        inputDataReserva: req.body.inputDataReserva,
        inputHoraReserva: req.body.inputHoraReserva

    }).then(function () {
        res.redirect("//:id")
    }).catch(function (erro) {
        res.send("Falha ao cadastrar reserva: " + erro)
    })
})

app.get("/update/:id", function (req, res) {
    post.findAll({
        where: {
            id: req.params.id,
            inputEmail: req.params.inputEmail
        }
    }).then(function (post) {
        res.render("update", { post })
        console.log(post)
    }).catch(function (erro) {
        res.send("Falha ao carregar dados: " + erro)
    })

})
app.post("/atualizarcadastro/:id", function (req, res) {
    post.update({
        inputNome: req.body.inputNome,
        inputTelefone: req.body.inputTelefone,
        inputEmail: req.body.inputEmail,        
        inputAniversario: req.body.inputAniversario,
        inputPassword: req.body.inputPassword, force: true
    },{
        where: {
            id: req.params.id
        }
    },).then(function () {
    res.redirect("/consulta")
}).catch(function (erro) {
    res.send("Falha ao atualizar dados: " + erro)
})
})

app.get("/updateReserva/:id", function (req, res) {
    post.findAll({
        where: {
            id: req.params.id,
            inputEmail: req.params.inputEmail
        }
    }).then(function (post) {
        res.render("updateReserva", { post })
        console.log(post)
    }).catch(function (erro) {
        res.send("Falha ao carregar dados: " + erro)
    })

})
app.post("/atualizarreserva/:id", function (req, res) {
    post.update({               
        inputAmbiente: req.body.inputAmbiente,
        inputUnidade: req.body.inputUnidade,  
        inputMesa: req.body.inputMesa,
        inputLugares: req.body.inputLugares,      
        inputDataReserva: req.body.inputDataReserva,
        inputHoraReserva: req.body.inputHoraReserva, force: true
    },{
        where: {
            inputEmail: req.params.inputEmail, 
            id: req.params.id
        }
    },).then(function () {
    res.redirect("/consulta")
}).catch(function (erro) {
    res.send("Falha ao atualizar reserva: " + erro)
})
})

app.get("/excluir/:id", function (req, res) {
    post.destroy({
        where: {
            id: req.params.id
        },
        force: true

    }).then(function () {
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send("Falha ao cadastrar dados: " + erro)
    })
})

app.listen(8081, function () {
    console.log("Servidor Ativo na porta 8081")
})